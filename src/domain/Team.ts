export interface Team {
  readonly id: string;
  name: string;
}

export const isTeam = (entity: unknown): entity is Team => {
  if (!entity || typeof entity !== "object") return false;
  const { id, name } = entity as { [key: string]: unknown };
  if (!id || typeof id !== "string") return false;
  return !(!name || typeof name !== "string");
};
