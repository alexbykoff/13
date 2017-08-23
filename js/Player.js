import {$, updateNeighbours} from './helpers';
import fx, {play} from "./sounds";
import Loot from "./Loot";

export default class Player {
    constructor() {
        this.loot = [];          // <-- this is the general loot stash
        this.level = 1;
        this.gold = 0;
        this.exp = 0;
        this.x = 0;
        this.y = 0;
    }

    movePlayerTo(x, y) {
        const newPosition = $(`#c${x}-${y}`);
        const oldPosition = $(`#c${this.x}-${this.y}`);

        if ([...newPosition.classList].indexOf("free") >= 0) {
            oldPosition.classList.remove("player", "fade");
            oldPosition.classList.add("free");
            newPosition.classList.remove("free", "fade");
            newPosition.classList.add("player");
            updateNeighbours(x, y);
            this.updatePlayerPosition(x, y);
        }
        else if ([...newPosition.classList].indexOf("item") >= 0) {
            oldPosition.classList.remove("player", "fade");
            oldPosition.classList.add("free");
            newPosition.classList.remove("item", "fade");
            newPosition.classList.add("player");
            updateNeighbours(x, y);
            this.updatePlayerPosition(x, y);
            new Loot();
            console.log(this.loot);
            play(fx.coinSound);
        }
    }

    updatePlayerPosition(x, y) {
        this.x = x;
        this.y = y;
    }
}