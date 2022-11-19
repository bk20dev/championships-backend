import { DatabaseError as SequelizeDatabaseError } from "sequelize";
import { DatabaseError as PostgresDatabaseError } from "pg";

export const isInvalidUuidError = (error: Error): boolean => {
  if (error instanceof SequelizeDatabaseError) {
    const originalError = error.original;
    if (originalError instanceof PostgresDatabaseError) {
      if (originalError.code === "22P02") {
        return true;
      }
    }
  }
  return false;
};
