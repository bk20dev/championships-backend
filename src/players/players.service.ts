import { Player } from "src/domain/Player";
import { PlayersRepository } from "./players.repository";

export class PlayersService {
  constructor(private readonly repository: PlayersRepository) {
  }

  getAll(): Promise<Player[]> {
    return this.repository.getAll();
  }

  getSingle(id: string): Promise<Player | undefined> {
    return this.repository.getSingle(id);
  }
}
