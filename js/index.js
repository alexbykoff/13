import Dungeon from "./Dungeon";

export const game = new Dungeon(20);
game.initialize();
game.buildNewRoom(120);
game.populateRoom();

document.onkeyup = e => {
    let x = 0, y = 0;
    switch (e.which) {
        case 37:
            x = -1;
            break;
        case 39:
            x = 1;
            break;
        case 38:
            y = -1;
            break;
        case 40:
            y = 1;
            break;
        default:
            break;
    }
    if (game.canMove) game.player.movePlayerTo(game.player.x + x, game.player.y + y);
};
