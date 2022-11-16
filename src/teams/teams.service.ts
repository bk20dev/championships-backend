import { TeamsRepository } from "./teams.repository";
import { Team } from "../domain/Team";
import { Player } from "../domain/Player";
import { DatabaseError } from "pg";
import { ApiError } from "../api/error";

export class TeamsService {
  constructor(private readonly repository: TeamsRepository) {
  }

  getAll(): Promise<TeamWithPlayers[]> {
    return this.repository.getAll();
  }

  async getSingle(id: string): Promise<TeamWithPlayers | undefined> {
    try {
      return await this.repository.getSingle(id);
    } catch (error) {
      if (error instanceof DatabaseError && error.code == "22P02") {
        const message = "Invalid id";
        throw new ApiError(message, 400);
      }
      throw error;
    }
  }

  async deleteSingle(id: string): Promise<TeamWithPlayers | undefined> {
    try {
      const team = await this.repository.getSingle(id);
      await this.repository.deleteSingle(id);
      return team;
    } catch (error) {
      if (error instanceof DatabaseError && error.code == "22P02") {
        const message = "Invalid id";
        throw new ApiError(message, 400);
      }
      throw error;
    }
  }
}

export type TeamWithPlayers = Team | { players: Player[] }
