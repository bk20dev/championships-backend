import { Player } from "../domain/Player";
import { PlayersRepository } from "./players.repository";
import { DatabaseError } from "pg";
import { ApiError } from "../api/error";

export class PlayersService {
  constructor(private readonly repository: PlayersRepository) {
  }

  getAll(): Promise<Player[]> {
    return this.repository.getAll();
  }

  getSingle(id: string): Promise<Player | undefined> {
    return this.repository.getSingle(id);
  }

  async createSingle(player: any): Promise<Player> {
    try {
      return await this.repository.createSingle(player);
    } catch (error) {
      if (error instanceof DatabaseError && error.code === "23502") {
        const message = "Player validation failed";
        throw new ApiError(message, 400);
      }
      throw error;
    }
  }

  async updateSingle(player: any): Promise<Player | undefined> {
    try {
      return await this.repository.updateSingle(player);
    } catch (error) {
      if (error instanceof DatabaseError) {
        if (error.code === "23502") {
          const message = "Player validation failed";
          throw new ApiError(message, 400);
        } else if (error.code === "22P02") {
          const message = "Invalid id";
          throw new ApiError(message, 400);
        }
      }
      throw error;
    }
  }

  deleteSingle(id: string): Promise<Player | undefined> {
    return this.repository.deleteSingle(id);
  }
}
