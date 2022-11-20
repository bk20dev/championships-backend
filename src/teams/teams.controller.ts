import { Handler, Router } from "express";
import { TeamsService, TeamWithPlayers } from "./teams.service";
import { handleCatching } from "../api/handler";
import { ApiError } from "../api/error";
import { Team } from "../domain/Team";

export class TeamsController {
  readonly router: Router;

  getAll: Handler = handleCatching<Team[]>(async () => {
    const allTeams = await this.service.getAll();
    return { status: "ok", code: 200, data: allTeams };
  });

  getSingle: Handler = handleCatching<TeamWithPlayers>(async (req) => {
    const { id } = req.params;
    const team = await this.service.getSingle(id);
    if (!team) throw new ApiError("Team not found", 404);
    return { status: "ok", code: 200, data: team };
  });

  createSingle: Handler = handleCatching<TeamWithPlayers>(async (req) => {
    const team = req.body;
    const createdTeam = await this.service.createSingle(team);
    return { status: "ok", code: 201, data: createdTeam };
  });

  updateSingle: Handler = handleCatching<TeamWithPlayers>(async (req) => {
    const { id } = req.params;
    const team = req.body;
    const updatedTeam = await this.service.updateSingle({ ...team, id });
    if (!updatedTeam) throw new ApiError("Team not found", 404);
    return { status: "ok", code: 200, data: updatedTeam };
  });

  deleteSingle: Handler = handleCatching<TeamWithPlayers>(async (req) => {
    const { id } = req.params;
    const team = await this.service.deleteSingle(id);
    if (!team) throw new ApiError("Team not found", 404);
    return { status: "ok", code: 200, data: team };
  });

  constructor(private readonly service: TeamsService) {
    this.router = Router()
      .get("/", this.getAll)
      .get("/:id", this.getSingle)
      .post("/", this.createSingle)
      .put("/:id", this.updateSingle)
      .delete("/:id", this.deleteSingle);
  }
}
