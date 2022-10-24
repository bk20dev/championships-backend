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
