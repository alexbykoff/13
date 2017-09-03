import {$, updateNeighbours} from './helpers';
import fx, {play} from "./sounds";
import Loot from "./Loot";
import Enemy from "./Enemy";
import {game} from "./index";

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
            per: 25,
            damage: 25
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
        else if ([...newPosition.classList].indexOf("enemy") >= 0) {
            const enemy = new Enemy();
            const player = this;
            game.startBattle(enemy, player, () => {
                newPosition.classList = "cell item";
            });

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
        const gold = $('#gold');
        gold.innerHTML = this.gold;
        Object.keys(this.stats).forEach(s => $(`#${s}`).innerHTML = `${s}: ${this.stats[s]}`);
    }
}
