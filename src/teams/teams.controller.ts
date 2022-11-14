import { Router } from "express";
import { TeamsService } from "./teams.service";

export class TeamsController {
  readonly router: Router;

  constructor(private readonly service: TeamsService) {
    this.router = Router();
  }
}
