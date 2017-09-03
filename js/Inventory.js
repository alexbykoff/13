import {$, C} from "./helpers";
import {game} from "./index";

export default class Inventory {
    constructor() {
        this.slots = 30;
        this.visible = false;
    }

    toggle() {
        if (this.visible) {
            this.visible = false;
            document.body.removeChild($(".inventory"));
            return;
        }
        const inv = C();
        inv.className = "inventory";

        game.player.loot.forEach((item, index) => {
            const image = require(`../images/${item.slot}.png`);
            const e = C();
            e.setAttribute("data-id", item.id);
            e.className = "inventory-object";
            e.style.backgroundImage = `url("${image}")`;
            e.style.borderStyle = item.rarity === "common" ? "none" : item.rarity === "rare" ? "dashed" : "solid";
            inv.appendChild(e);
            // show tooltip
            const name = item.name ? `<div class="t-name">${item.name}</div>` : "";
            let stats = "";
            Object.keys(item.stats).map(s => {
                stats += `<div class="t-stat">${s}: ${item.stats[s]}</div>`
            });
            const tooltip = name + `<div class="t-desc">${item.rarity} ${item.slot} ${item.type}</div>${stats}`;
            e.addEventListener("mouseenter", () => {
                const t = C();
                t.className = "inventory-tooltip";
                t.innerHTML = tooltip;
                e.appendChild(t);
            });
            e.addEventListener("dblclick", (event) => {
                if (!game.player.gear[item.slot]) {
                    game.player.gear[item.slot] = item;
                    game.player.loot.splice(game.player.loot.findIndex(i => i.id === item.id), 1);
                    console.log('equipped ' + item);
                    event.target.remove();
                    game.player.updateInfobar();
                    console.log(game.player.loot);
                    return console.log(game.player.gear);
                }
                console.log('slot is equipped. todo replace in inventory');
                return console.log(game.player.gear);
            });
            // hide tooltip
            e.addEventListener("mouseleave", () => {
                e.removeChild($(".inventory-tooltip"));
            });
        });
        document.body.appendChild(inv);
        this.visible = true;
    }
}
