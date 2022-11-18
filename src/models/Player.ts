import sequelize from "../sequelize";
import { DataTypes, DATEONLY, ENUM, Model, STRING, UUID } from "sequelize";
import { Player as DomainPlayer } from "../domain/Player";

export const Player = sequelize.define<Model<DomainPlayer>>("Player", {
  id: {
    type: UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  firstName: {
    type: STRING,
    allowNull: false,
  },
  lastName: {
    type: STRING,
    allowNull: false,
  },
  position: {
    type: ENUM(
      "keeper", "half-back", "sweeper", "forward"),
    allowNull: false,
  },
  dateOfBirth: {
    type: DATEONLY,
    allowNull: false,
  },
});
