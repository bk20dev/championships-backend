import { Client } from "pg";
import { isPlayer, Player } from "../domain/Player";

export class PlayersRepository {
  constructor(private readonly client: Client) {
  }

  async getAll(): Promise<Player[]> {
    const result = await this.client.query(GET_ALL);
    return result.rows
      .map(this.parsePlayer)
      .filter(Boolean);
  }

  async getSingle(id: string): Promise<Player | undefined> {
    const result = await this.client.query(GET_SINGLE, [id]);
    const player = result.rows[0];
    if (!player) return undefined;
    return this.parsePlayer(player);
  }

  async createSingle(player: Omit<Player, "id">): Promise<Player | undefined> {
    const { firstName, lastName, dateOfBirth, position } = player;
    const result = await this.client.query(CREATE_SINGLE, [
      firstName, lastName, dateOfBirth, position,
    ]);
    const createdPlayer = result.rows[0];
    return this.parsePlayer(createdPlayer);
  }

  async deleteSingle(id: string): Promise<Player | undefined> {
    const result = await this.client.query(DELETE_SINGLE, [id]);
    const player = result.rows[0];
    if (!player) return undefined;
    return this.parsePlayer(player);
  }

  private parsePlayer = (entity: any): Player | undefined => {
    if (!entity || typeof entity !== "object") return undefined;
    const { id, first_name, last_name, position, date_of_birth } = entity;
    const player = {
      id,
      firstName: first_name,
      lastName: last_name,
      position,
      dateOfBirth: date_of_birth,
    };
    if (isPlayer(player)) return player;
    return undefined;
  };
}

const GET_ALL = `SELECT id, first_name, last_name, date_of_birth, position
                 FROM public.player`;
const GET_SINGLE = `SELECT id, first_name, last_name, date_of_birth, position
                    FROM public.player
                    WHERE id = $1`;
const CREATE_SINGLE = `INSERT INTO public.player(first_name, last_name,
                                                 date_of_birth, position)
                       VALUES ($1, $2, $3, $4)
                       RETURNING id, first_name, last_name, date_of_birth, position`;
const DELETE_SINGLE = `DELETE
                       FROM public.player
                       WHERE id = $1
                       RETURNING id, first_name, last_name, date_of_birth, position`;
