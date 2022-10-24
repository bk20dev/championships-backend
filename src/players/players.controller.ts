import { Router } from "express";
import { Player } from "src/domain/Player";
import { PlayersService } from "./players.service";

export class PlayersController {
  readonly router: Router;

  constructor(private readonly service: PlayersService) {
    this.router = Router();
  }

  getAll(): Player[] {
    return [];
  }
}
