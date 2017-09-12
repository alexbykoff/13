import {$, C} from "./helpers";
import {game} from "./index";

export default function Card(item) {
    game.canMove = false;
    const card = C();
    card.className = "card";
    const name = item.name ? `<div class="t-name">${item.name}</div>` : "";
    let stats = "";
    Object.keys(item.stats).forEach(s => {
        stats += `<div class="t-stat">${s}: ${item.stats[s]}`;
        // Compare loot quality
        if (game.player.gear[item.slot]) {
            stats += `(${item.stats[s] - game.player.gear[item.slot].stats[s]})</div>`;
        } else {
            stats += `</div>`;
        }
    });
    const cardData = name + `<div class="t-desc">${item.rarity} ${item.slot} ${item.type}</div>${stats}`;

    const equip = C();
    equip.className = "card-button";
    equip.innerHTML = "Equip";
    equip.onclick = () => {
        game.player.gear[item.slot] = item;
        document.body.removeChild($(".card"));
        game.canMove = true;
        return game.player.updateInfobar();
    };

    const sell = C();
    sell.className = "card-button";
    sell.onclick = () => {
        game.player.gold += item.price;
        document.body.removeChild($(".card"));
        game.canMove = true;
        return game.player.updateInfobar();
    };

    sell.innerHTML = "Sell";

    card.innerHTML = cardData;
    card.appendChild(equip);
    card.appendChild(sell);

    return card;
};
