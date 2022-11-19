import { Player as DomainPlayer } from "../domain/Player";
import { Player } from "../models/Player";
import { UniqueConstraintError, ValidationError } from "sequelize";
import { ApiError } from "../api/error";

export class PlayersService {
  constructor() {
  }

  async getAll(): Promise<DomainPlayer[]> {
    const players = await Player.findAll();
    return players.map(it => it.dataValues);
  }

  async getSingle(id: string): Promise<DomainPlayer | undefined> {
    const player = await Player.findByPk(id)
      .catch(() => undefined);
    return player?.dataValues;
  }

  async createSingle(body: any): Promise<DomainPlayer> {
    try {
      const player = await Player.create(body);
      return player.dataValues;
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        throw new ApiError("This player already exists", 409);
      }
      if (error instanceof ValidationError) {
        const errors = error.errors.map(it => [it.path, it.message]);
        throw new ApiError("Validation error", 422, Object.fromEntries(errors));
      }
      throw error;
    }
  }

  async updateSingle(changes: any): Promise<DomainPlayer | undefined> {
    const player = await Player.findByPk(changes.id)
      .catch(() => undefined);
    if (!player) {
      return undefined;
    }

    try {
      await player.update(changes);
      return player.dataValues;
    } catch (error) {
      if (error instanceof ValidationError) {
        const errors = error.errors.map(it => [it.path, it.message]);
        throw new ApiError("Validation error", 422, Object.fromEntries(errors));
      }
      throw error;
    }
  }

  async deleteSingle(id: string): Promise<DomainPlayer | undefined> {
    const player = await Player.findByPk(id)
      .catch(() => undefined);
    if (!player) {
      return undefined;
    }
    await player.destroy();
    return player.dataValues;
  }
}
