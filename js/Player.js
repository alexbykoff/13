import {$, updateNeighbours} from './helpers';
import fx, {play} from "./sounds";
import Loot from "./Loot";
import Enemy from "./Enemy";
import {game} from "./index";

export default class Player {
    constructor() {
        this.loot = [];          // <-- this is the general loot stash
        this.gold = 0;
        this.x = 0;
        this.y = 0;
        this.stats = {
            str: 25,
            vit: 25,
            agi: 25,
            per: 25,
            damage: 25
        };
        this.gear = {};         // player armor doll
        this.updateInfobar();
    }

    movePlayerTo(x, y) {
        const n = $(`#c${x}-${y}`);
        const o = $(`#c${this.x}-${this.y}`);

        if ([...n.classList].indexOf("free") >= 0) {
            o.className = "free cell";
            n.className = "player cell";
            updateNeighbours(x, y);
            this.newPos(x, y);
        }
        else if ([...n.classList].indexOf("item") >= 0) {
            o.className = "free cell";
            n.className = "player cell";
            updateNeighbours(x, y);
            this.newPos(x, y);
            new Loot();
            console.log(this.loot);
            play(fx.coinSound);
        }
        else if ([...n.classList].indexOf("enemy") >= 0) {
            const enemy = new Enemy();
            const player = this;
            game.startBattle(enemy, player, () => {
                n.classList = "cell item";
            });
        }
    }

    newPos(x, y) {
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
        this.hp = this.maxHp = this.stats.vit * 10;
        $('#gold').innerHTML = this.gold;
        Object.keys(this.stats).forEach(s => $(`#${s}`).innerHTML = `${s}: ${this.stats[s]}`);
    }
}
