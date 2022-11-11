import { Handler, Router } from "express";
import { PlayersService } from "./players.service";
import { Player } from "../domain/Player";
import { DataResponse, Response } from "../api/api";

export class PlayersController {
  readonly router: Router;

  constructor(private readonly service: PlayersService) {
    this.router = Router()
      .get("/", this.getAll)
      .get("/:id", this.getSingle)
      .post("/", this.createSingle);
  }

  getAll: Handler = async (req, res) => {
    const allPlayers = await this.service.getAll();
    const response: DataResponse<Player> = {
      status: "ok", code: 200, data: allPlayers,
    };
    res.json(response).status(response.code);
  };

  getSingle: Handler = async (req, res) => {
    const { id } = req.params;
    const player = await this.service.getSingle(id).catch(() => undefined);

    if (!player) {
      const response: Response = {
        status: "error", code: 404, message: "Player not found",
      };
      res.json(response).status(response.code);
      return;
    }

    const response: DataResponse<Player> = {
      status: "ok", code: 200, data: player,
    };
    res.json(response).status(response.code);
  };

  createSingle: Handler = async (req, res) => {
    const player = req.body;
    const createdPlayer = await this.service.createSingle(player);
    const response: DataResponse<Player> = {
      status: "ok", code: 201, data: createdPlayer,
    };
    res.json(response).status(response.code);
  };
}
