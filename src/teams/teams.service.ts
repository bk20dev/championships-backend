import { TeamsRepository } from "./teams.repository";
import { PlayersRepository } from "../players/players.repository";

export class TeamsService {
  constructor(private readonly teamsRepository: TeamsRepository,
              private readonly playersRepository: PlayersRepository) {
  }
}
