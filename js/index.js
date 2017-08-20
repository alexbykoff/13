import Dungeon from "./Dungeon";
import fx, {play} from "./sounds";

const dungeon = new Dungeon(20);
document.querySelector(".menu-wrapper").innerHTML = "";
dungeon.initialize();
dungeon.buildNewRoom(180);
dungeon.populateRoom();
play(fx.introSound);

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
    dungeon.movePlayerTo(dungeon.player.x + x, dungeon.player.y + y);
};


