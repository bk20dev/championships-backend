import { Router } from "express";
import { Player } from "src/domain/Player";

export class PlayersControllerImpl {
  readonly router: Router;

  constructor(private readonly service: never) {
    this.router = Router();
  }

  getAll(): Player[] {
    return [];
  }
}
