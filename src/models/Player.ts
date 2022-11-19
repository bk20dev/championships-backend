import sequelize from "../sequelize";
import { DataTypes, DATEONLY, ENUM, Model, STRING, UUID } from "sequelize";
import { Player as DomainPlayer } from "../domain/Player";

const playerPositions = ["keeper", "half-back", "sweeper", "forward"];

export const Player = sequelize.define<Model<DomainPlayer>>("Player", {
  id: {
    type: UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    validate: { isUUID: 4 },
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
    type: ENUM(...playerPositions),
    allowNull: false,
    validate: { isIn: [playerPositions] },
  },
  dateOfBirth: {
    type: DATEONLY,
    allowNull: false,
    validate: { isDate: true },
  },
});
