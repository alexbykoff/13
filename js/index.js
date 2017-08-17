import {buildLevel, populateLevel} from "./builders";
import {rndInt, positionPlayer} from "./helpers";
import fx, {play} from "./sounds";

const game = {};
game.level = buildLevel(rndInt(18, 24), rndInt(12, 18));
game.playerPosition = {row: 1, column: 1};
positionPlayer(1, 1, game);
populateLevel(game.level);
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


