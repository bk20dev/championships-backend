import * as express from "express";
import { apiErrorHandler } from "./api/error";
import { PlayersService } from "./players/players.service";
import { PlayersController } from "./players/players.controller";
import sequelize from "./sequelize";
import { TeamsController } from "./teams/teams.controller";
import { TeamsService } from "./teams/teams.service";
import { Team } from "./models/Team";
import { Player } from "./models/Player";

const app = express();
const port = process.env.port || 3000;

app.use(express.json());

const playersService = new PlayersService();
const playersController = new PlayersController(playersService);
app.use("/players", playersController.router);

const teamsService = new TeamsService();
const teamsController = new TeamsController(teamsService);
app.use("/teams", teamsController.router);

app.use(apiErrorHandler);

const bootstrap = async (): Promise<void> => {
  Team.belongsToMany(Player, { as: "players", through: "PlayerTeam" });
  Player.belongsToMany(Team, { as: "teams", through: "PlayerTeam" });
  await sequelize.sync({});
};

bootstrap().then(() => {
  app.listen(port, () => {
    console.log(`Server listening at ::${port}`);
  });
});

