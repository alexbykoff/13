import Dungeon from "./Dungeon";
import {buildWrapper, createNewRandomLevel, populateLevel} from "./builders";
import {rndInt, positionPlayer} from "./helpers";
import fx, {play} from "./sounds";

const dungeon = new Dungeon(20);
dungeon.initialize();
dungeon.buildNewRoom(140);
// game.level = buildWrapper();
// createNewRandomLevel(140, game);
// game.playerPosition = positionPlayer();
//positionPlayer(game.playerPosition.row,, game);
// populateLevel(game.level);
play(fx.introSound);

document.onkeyup = e => {
    let row = 0, column = 0;
    switch (e.which) {
        case 37:
            column = -1;
            break;
        case 39:
            column = 1;
            break;
        case 40:
            row = 1;
            break;
        case 38:
            row = -1;
            break;
        default:
            break;
    }
    positionPlayer(game.playerPosition.row + row, game.playerPosition.column + column, game);
};


