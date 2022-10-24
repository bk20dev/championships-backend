import { Router } from "express";

export class PlayersControllerImpl {
  readonly router: Router;

  constructor(private readonly service: never) {
    this.router = Router();
  }
}
