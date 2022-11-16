import { Handler, Router } from "express";
import { TeamsService, TeamWithPlayers } from "./teams.service";
import { handleCatching } from "../api/handler";
import { ApiError } from "../api/error";

export class TeamsController {
  readonly router: Router;

  getAll: Handler = handleCatching<TeamWithPlayers[]>(async () => {
    const allTeams = await this.service.getAll();
    return { status: "ok", code: 200, data: allTeams };
  });

  getSingle: Handler = handleCatching<TeamWithPlayers>(async (req) => {
    const { id } = req.params;
    const team = await this.service.getSingle(id);
    if (!team) throw new ApiError("Team not found", 404);
    return { status: "ok", code: 200, data: team };
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
      .delete("/:id", this.deleteSingle);
  }
}
