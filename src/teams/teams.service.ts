import { Team as DomainTeam } from "../domain/Team";
import { Player as DomainPlayer } from "../domain/Player";
import { Team } from "../models/Team";
import { Player } from "../models/Player";
import { isInvalidUuidError } from "../api/util";

export class TeamsService {
  constructor() {
  }

  async getAll(): Promise<DomainTeam[]> {
    const teams = await Team.findAll();
    return teams.map(it => it.dataValues);
  }

  async getSingle(id: string): Promise<TeamWithPlayers | undefined> {
    try {
      const team = await Team.findByPk(id, {
        include: {
          model: Player, as: "players",
          through: { attributes: [] },
        },
      });
      return team?.dataValues;
    } catch (error) {
      if (isInvalidUuidError(error)) {
        return undefined;
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
