import { Client } from "pg";
import { TeamWithPlayers } from "./teams.service";
import { PlayersRepository } from "../players/players.repository";
import { isTeam } from "../domain/Team";

export class TeamsRepository {
  constructor(private readonly client: Client) {
  }

  static parseTeam(entity: any): TeamWithPlayers | undefined {
    if (!entity || typeof entity !== "object") return undefined;
    const { id, name, players } = entity;
    if (!Array.isArray(players)) {
      return undefined;
    }
    const parsedPlayers = (Array.isArray(players) ? players : [])
      .map(PlayersRepository.parsePlayer)
      .filter(Boolean);
    const team = { id, name, players: parsedPlayers };
    if (isTeam(team)) return team;
    return undefined;
  }

  async getAll(): Promise<TeamWithPlayers[]> {
    const result = await this.client.query(GET_ALL);
    return result.rows
      .map(TeamsRepository.parseTeam)
      .filter(Boolean);
  }

  async getSingle(id: string): Promise<TeamWithPlayers | undefined> {
    const result = await this.client.query(GET_SINGLE, [id]);
    const team = result.rows[0];
    return TeamsRepository.parseTeam(team);
  }
}

const GET_ALL = `SELECT t.id, t.name, array_to_json(array_agg(p.*)) players
                 FROM team t
                          JOIN team_players tp ON t.id = tp.team_id
                          JOIN player p ON tp.player_id = p.id
                 GROUP BY t.id;`;
const GET_SINGLE = `SELECT t.id, t.name, array_to_json(array_agg(p.*)) players
                    FROm team t
                             JOIN team_players tp ON t.id = tp.team_id
                             JOIN player p ON tp.player_id = p.id
                    WHERE t.id = $1
                    GROUP BY t.id;`;
