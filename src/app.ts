import * as express from "express";
import { PlayersController as PlayersController } from "./players/players.controller";
import { PlayersService } from "./players/players.service";
import { apiErrorHandler } from "./api/error";
import { Client } from "pg";
import { PlayersRepository } from "./players/players.repository";
import { TeamsController } from "./teams/teams.controller";
import { TeamsService } from "./teams/teams.service";
import { TeamsRepository } from "./teams/teams.repository";

const app = express();
const port = process.env.port || 3000;

const client = new Client();
// noinspection JSIgnoredPromiseFromCall
client.connect();

app.use(express.json());

const playersRepository = new PlayersRepository(client);
const playersService = new PlayersService(playersRepository);
const playersController = new PlayersController(playersService);
app.use("/players", playersController.router);

const teamsRepository = new TeamsRepository(client);
const teamsService = new TeamsService(teamsRepository);
const teamsController = new TeamsController(teamsService);
app.use("/teams", teamsController.router);

app.use(apiErrorHandler);

app.listen(port, () => {
  console.log(`Server listening at ::${port}`);
});
