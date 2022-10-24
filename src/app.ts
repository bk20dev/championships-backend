import * as express from "express";
import { PlayersControllerImpl as PlayersController } from "./players/players.controller";

const app = express();
const port = process.env.port || 3000;

const playersController = new PlayersController({} as never);
app.use(playersController.router);

app.listen(port, () => {
  console.log(`Server listening at ::${port}`);
});
