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
        this.stats = {
            str: 25,
            vit: 25,
            agi: 25,
            per: 25
        };
        this.hp = this.stats.vit * 11;
        this.gear = {};         // player armor doll
        this.updateInfobar();
    }

    movePlayerTo(x, y) {
        const newPosition = $(`#c${x}-${y}`);
        const oldPosition = $(`#c${this.x}-${this.y}`);

        if ([...newPosition.classList].indexOf("free") >= 0) {
            oldPosition.className = "free cell";
            newPosition.className = "player cell";
            updateNeighbours(x, y);
            this.updatePlayerPosition(x, y);
        }
        else if ([...newPosition.classList].indexOf("item") >= 0) {
            oldPosition.className = "free cell";
            newPosition.className = "player cell";
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

    updateInfobar() {
        Object.keys(this.stats).forEach(stat => {
            this.stats[stat] = 25;
            Object.keys(this.gear).forEach(item => {
                this.stats[stat] += this.gear[item].stats[stat] || 0;
            })
        });
        const level = $('#level');
        const gold = $('#gold');
        level.innerHTML = this.level;
        gold.innerHTML = this.gold;
        Object.keys(this.stats).forEach(s => $(`#${s}`).innerHTML = `${s}: ${this.stats[s]}`);
    }
}
