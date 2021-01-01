import "colors";
import { createOrLoadGame } from "../common/game";

import { expressServer } from "./server";


function start() {
    const game = createOrLoadGame();
    expressServer(game);
}

start();
