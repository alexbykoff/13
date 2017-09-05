import {$, C} from "./helpers";
import {game} from "./index";

export default class Inventory {
    constructor() {
        this.vis = false;
    }

    toggle() {
        if (this.vis) {
            this.vis = false;
            return document.body.removeChild($(".inventory"));
        }
        const inv = C();
        inv.className = "inventory";
        game.player.loot.forEach(i => {
            const image = require(`../images/${i.slot}.png`);
            const e = C();
            e.setAttribute("data-id", i.id);
            e.className = "inventory-object";
            e.style.backgroundImage = `url("${image}")`;
            e.style.borderStyle = i.rarity === "common" ? "none" : i.rarity === "rare" ? "dashed" : "solid";
            inv.appendChild(e);
            // show tooltip
            const name = i.name ? `<div class="t-name">${i.name}</div>` : "";
            let stats = "";
            Object.keys(i.stats).map(s => {
                stats += `<div class="t-stat">${s}: ${i.stats[s]}`;
                // Compare loot quality
                if (game.player.gear[i.slot]) {
                    stats += `(${i.stats[s] - game.player.gear[i.slot].stats[s]})</div>`;
                } else {
                    stats += `</div>`;
                }
            });
            const tooltip = name + `<div class="t-desc">${i.rarity} ${i.slot} ${i.type}</div>${stats}`;
            e.addEventListener("mouseenter", () => {
                const t = C();
                t.className = "inventory-tooltip";
                t.innerHTML = tooltip;
                e.appendChild(t);
            });
            e.addEventListener("dblclick", (event) => {
                if (game.player.gear[i.slot]) {
                    game.player.gold += game.player.gear[i.slot].price;
                }
                game.player.gear[i.slot] = i;
                game.player.loot.splice(game.player.loot.findIndex(i => i.id === i.id), 1);
                event.target.remove();
                game.player.updateInfobar();
                game.player.updateInventory();
            });
            // hide tooltip
            e.addEventListener("mouseleave", () => {
                e.removeChild($(".inventory-tooltip"));
            });
        });
        document.body.appendChild(inv);
        this.vis = true;
    }
}
