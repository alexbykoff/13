import Dungeon from "./Dungeon";

export const game = new Dungeon(20);
document.querySelector(".menu-wrapper").innerHTML = "";
game.initialize();
game.buildNewRoom(190);
game.populateRoom();
//play(fx.introSound);

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
    game.movePlayerTo(game.player.x + x, game.player.y + y);
};