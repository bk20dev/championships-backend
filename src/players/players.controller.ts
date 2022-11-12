import { Handler, Router } from "express";
import { PlayersService } from "./players.service";
import { Player } from "../domain/Player";
import { ApiError } from "../api/error";
import { handleCatching } from "../api/handler";

export class PlayersController {
  readonly router: Router;

  getAll: Handler = handleCatching<Player[]>(async () => {
    const allPlayers = await this.service.getAll();
    return { status: "ok", code: 200, data: allPlayers };
  });

  getSingle: Handler = handleCatching<Player>(async (req) => {
    const { id } = req.params;
    const player = await this.service.getSingle(id);
    if (!player) throw new ApiError("Player not found", 404);
    return { status: "ok", code: 200, data: player };
  });

  createSingle: Handler = handleCatching<Player>(async (req) => {
    const player = req.body;
    const createdPlayer = await this.service.createSingle(player);
    return { status: "ok", code: 201, data: createdPlayer };
  });

  updateSingle: Handler = handleCatching<Player>(async (req) => {
    const { id } = req.params;
    const player = req.body;
    const updatedPlayer = await this.service.updateSingle({ ...player, id });
    if (!updatedPlayer) throw new ApiError("Player not found", 404);
    return { status: "ok", code: 200, data: updatedPlayer };
  });

  deleteSingle: Handler = handleCatching<Player>(async (req) => {
    const { id } = req.params;
    const player = await this.service.deleteSingle(id);
    if (!player) throw new ApiError("Player not found", 404);
    return { status: "ok", code: 200, data: player };
  });

  constructor(private readonly service: PlayersService) {
    this.router = Router()
      .get("/", this.getAll)
      .get("/:id", this.getSingle)
      .post("/", this.createSingle)
      .put("/:id", this.updateSingle)
      .delete("/:id", this.deleteSingle);
  }
}
