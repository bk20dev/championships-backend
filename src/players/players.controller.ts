import { Handler, Router } from "express";
import { PlayersService } from "./players.service";

export class PlayersController {
  readonly router: Router;

  constructor(private readonly service: PlayersService) {
    this.router = Router();
    this.router.get("/", this.getAll).get("/:id", this.getSingle);
  }

  getAll: Handler = (req, res) => {
    const allPlayers = this.service.getAll();
    res.json(allPlayers).status(200);
  };

  getSingle: Handler = (req, res) => {
    const { id } = req.params;
    const player = this.service.getSingle(id);
    res.json(player).status(200);
  };
}
