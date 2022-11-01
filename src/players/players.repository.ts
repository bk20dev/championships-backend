import { Client } from "pg";
import { Player } from "../domain/Player";

export class PlayersRepository {
  constructor(private readonly client: Client) {
  }

  async getAll(): Promise<Player[]> {
    const query = `SELECT id, first_name, last_name, date_of_birth, position
                   FROM public.player`;
    const result = await this.client.query(query);
    return result.rows.map(({ id, position, ...player }) => ({
      id, position,
      firstName: player.first_name,
      lastName: player.last_name,
      dateOfBirth: player.date_of_birth,
    }));
  }

  async getSingle(id: string): Promise<Player | undefined> {
    const query = `SELECT id, first_name, last_name, date_of_birth, position
                   FROM public.player
                   WHERE id = $1`;
    const result = await this.client.query(query, [id]);
    return result.rows.map(({ id, position, ...player }) => ({
      id, position,
      firstName: player.first_name,
      lastName: player.last_name,
      dateOfBirth: player.date_of_birth,
    }))[0]
  }
}
