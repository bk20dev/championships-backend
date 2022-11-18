import { Sequelize } from "sequelize";

const sequelize = new Sequelize({ dialect: "postgres" });
export default sequelize;
