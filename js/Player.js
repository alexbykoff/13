import {$, updateNeighbours} from './helpers';
import fx, {play} from "./sounds";
import Loot from "./Loot";
import Enemy from "./Enemy";
import {game} from "./index";

export default class Player {
    constructor() {
        this.loot = [];          // <-- this is the general loot stash
        this.x = this.y = this.gold = 0;
        this.kills = 0;          // Enemy kill count
        this.level = 1;          // Floor
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
        if ([...n.classList].indexOf("finish") >= 0) {
            this.level++;
            game.initialize();
            this.cells = 120;
            game.buildNewRoom(this.cells);
            game.populateRoom();
        }
        else if ([...n.classList].indexOf("free") >= 0) {
            o.className = "free cell";
            n.className = "player cell";
            updateNeighbours(x, y);
            this.x = x;
            this.y = y;
        }
        else if ([...n.classList].indexOf("item") >= 0) {
            o.className = "free cell";
            n.className = "player cell";
            updateNeighbours(x, y);
            this.x = x;
            this.y = y;
            new Loot();
            play(fx.coinSound);
        }
        else if ([...n.classList].indexOf("enemy") >= 0) {
            const enemy = new Enemy();
            const player = this;
            game.startBattle(enemy, player, () => { // Win callback
                n.classList = "cell item";
                this.kills++;
            });
        }

    }

    updateInfobar() {
        Object.keys(this.stats).forEach(stat => {
            this.stats[stat] = 25;
            Object.keys(this.gear).forEach(item => {
                this.stats[stat] += this.gear[item].stats[stat] || 0;
            })
        });
        this.hp = this.maxHp = this.stats.vit * 10;
        $('#level').innerHTML = `Floor: ${this.level}`;
        $('#gold').innerHTML = `Gold: ${this.gold}`;
        $('#kill').innerHTML = `Kills: ${this.gold}`;
        Object.keys(this.stats).forEach(s => $(`#${s}`).innerHTML = `${s}: ${this.stats[s]}`);
    }
}
