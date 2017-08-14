import {buildLevel, populateLevel} from "./builders";
import {rndInt, positionPlayer} from "./helpers";

const game = {};
game.level = buildLevel(rndInt(14, 24), rndInt(12, 18));
game.playerPosition = {row: 1, column: 1};
positionPlayer(1, 1, game);
populateLevel(game.level);
document.onkeyup = keyboardHandler;

function keyboardHandler(e) {
    switch (e.which) {
        case 37:
            positionPlayer(game.playerPosition.row, game.playerPosition.column - 1, game);
            break;
        case 39:
            positionPlayer(game.playerPosition.row, game.playerPosition.column + 1, game);
            break;
        case 40:
            positionPlayer(game.playerPosition.row + 1, game.playerPosition.column, game);
            break;
        case 38:
            positionPlayer(game.playerPosition.row - 1, game.playerPosition.column, game);
            break;
        default:
            break;
    }
}
