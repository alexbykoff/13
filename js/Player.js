import {$, C, updateNeighbours} from './helpers';
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
            str: 35,
            vit: 35,
            agi: 35,
            per: 35,
            damage: 35
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
            play(fx.down);
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
            const enemyType = n.dataset.enemyType;
            const enemy = new Enemy(enemyType);
            const player = this;
            game.startBattle(enemy, player, () => { // Win callback
                n.classList = "cell item";
                this.kills++;
                this.updateInfobar();
            }, () => {
                this.showGameover();
            });
        }

    }

    updateInfobar() {
        Object.keys(this.stats).forEach(stat => {
            this.stats[stat] = 35;
            this.gear && Object.keys(this.gear).forEach(item => {
                this.stats[stat] += this.gear[item].stats[stat] || 0;
            })
        });
        this.gear && Object.keys(this.gear).forEach(item => {
            let data = "";
            this.gear[item].name && (data += `<div class="sidebar-itemname">${this.gear[item].name}</div>`);
            Object.keys(this.gear[item].stats).forEach(stat => {
                data += `<div>${stat}: ${this.gear[item].stats[stat]}</div>`;
            });
            $(`#${item}`).innerHTML = data;
            $(`#${item}`).className = this.gear[item].rarity
        });
        this.hp = this.stats.vit * 9;
        this.score = this.kills * this.level * this.gold;
        $('#gold').innerHTML = `Gold: ${this.gold}`;
        $('#kill').innerHTML = `Kills: ${this.kills}`;
        $('#hp').innerHTML = `Health: ${this.hp}`;
        $('#score').innerHTML = `Score: ${this.score}`;

        Object.keys(this.stats).forEach(s => $(`#${s}`).innerHTML = `${s}: ${this.stats[s]}`);
    }

    showGameover() {
        game.canMove = false;
        console.log('showGameover');
        const g = C();
        g.classList.add('gameover');
        g.innerHTML =
            `<h1>Game Over!</h1><h2>Score: ${this.score}</h2>
<p>You defeated ${this.kills} foes and ventured down the dungeon level ${this.level}</p>
<p>Sadly, you perished but your fame and courage will outlive the greatest of the kings.</p>
`;

        const restart = C();
        restart.className = "card-button";
        restart.innerHTML = "Restart";
        restart.onclick = () => {
            window.location.reload(true);
        };

        g.appendChild(restart);

        $('.holder').appendChild(g);
    }
}
