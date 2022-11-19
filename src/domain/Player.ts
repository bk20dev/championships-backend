export interface Player {
  readonly id: string;
  firstName: string;
  lastName: string;
  position: PlayerPosition;
  dateOfBirth: Date;
}

export enum PlayerPosition {
  Keeper = "keeper",
  HalfBack = "half-back",
  Sweeper = "sweeper",
  Forward = "forward",
}

export const isPlayer = (entity: unknown): entity is Player => {
  if (!entity || typeof entity !== "object") return false;
  const {
    id, firstName, lastName, position, dateOfBirth,
  } = entity as { [key: string]: unknown };
  if (!id || typeof id !== "string") return false;
  if (!firstName || typeof firstName !== "string") return false;
  if (!lastName || typeof lastName !== "string") return false;
  if (!position || typeof position !== "string") return false;
  if (!Object.values(PlayerPosition)
    .includes(position as PlayerPosition)) {
    return false;
  }
  return dateOfBirth instanceof Date;
};
