import { Team as DomainTeam } from "../domain/Team";
import { Player as DomainPlayer } from "../domain/Player";
import { Team } from "../models/Team";
import { Player } from "../models/Player";
import { isInvalidUuidError } from "../api/util";
import { Includeable, UniqueConstraintError, ValidationError } from "sequelize";
import { ApiError } from "../api/error";

const includePlayers: Includeable = {
  model: Player, as: "players",
  through: { attributes: [] },
};

export class TeamsService {
  constructor() {
  }

  async getAll(): Promise<DomainTeam[]> {
    const teams = await Team.findAll();
    return teams.map(it => it.dataValues);
  }

  async getSingle(id: string): Promise<TeamWithPlayers | undefined> {
    try {
      const team = await Team.findByPk(id, { include: includePlayers });
      return team?.dataValues;
    } catch (error) {
      if (isInvalidUuidError(error)) {
        return undefined;
      }
      throw error;
    }
  }

  async createSingle(body: any): Promise<TeamWithPlayers> {
    try {
      const team = await Team.create(body);
      if (Array.isArray(body.players)) {
        // @ts-ignore
        await team.setPlayers(body.players).catch(() => []);
      }
      await team.reload({ include: includePlayers });
      return team.dataValues;
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        throw new ApiError("This team already exists", 409);
      }
      if (error instanceof ValidationError) {
        const errors = error.errors.map(it => [it.path, it.message]);
        throw new ApiError("Validation error", 422, Object.fromEntries(errors));
      }
      throw error;
    }
  }

  async updateSingle(changes: any): Promise<TeamWithPlayers | undefined> {
    try {
      const team = await Team.findByPk(changes.id);
      if (!team) {
        return undefined;
      }
      await team.update(changes);
      if (Array.isArray(changes.players)) {
        // @ts-ignore
        await team.setPlayers(changes.players).catch(() => []);
      }
      await team.reload({ include: includePlayers });
      return team.dataValues;
    } catch (error) {
      if (error instanceof ValidationError) {
        const errors = error.errors.map(it => [it.path, it.message]);
        throw new ApiError("Validation error", 422, Object.fromEntries(errors));
      }
      throw error;
    }
  }

  async deleteSingle(id: string): Promise<TeamWithPlayers | undefined> {
    try {
      const team = await Team.findByPk(id, {
        include: {
          model: Player, as: "players",
          through: { attributes: [] },
        },
      });
      if (!team) {
        return undefined;
      }
      await team.destroy();
      return team.dataValues;
    } catch (error) {
      if (isInvalidUuidError(error)) {
        return undefined;
      }
      throw error;
    }
  }
}

export type TeamWithPlayers = DomainTeam | { players: DomainPlayer[] }
