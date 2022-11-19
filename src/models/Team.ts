import sequelize from "../sequelize";
import { DataTypes, Model, STRING, UUID } from "sequelize";
import { Team as DomainTeam } from "../domain/Team";

export const Team = sequelize.define<Model<DomainTeam>>("Team", {
  id: {
    type: UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    validate: { isUUID: 4 },
  },
  name: {
    type: STRING,
    allowNull: false,
  },
});
