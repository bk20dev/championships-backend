import * as express from "express";
import { PlayersController as PlayersController } from "./players/players.controller";
import { PlayersService } from "./players/players.service";

const app = express();
const port = process.env.port || 3000;

const playersService = new PlayersService();
const playersController = new PlayersController(playersService);
app.use(playersController.router);

app.listen(port, () => {
  console.log(`Server listening at ::${port}`);
});
