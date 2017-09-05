import {rndInt, $, C} from "./helpers";
import {game} from "./index";
import {generateName} from "./name";

export default class Loot {
    constructor() {
        this.id = Loot.ID(); // used for attr within inventory div
        this.price = 0;            // price you can sell an item for
        this.type = "";            // type of item: armor, weapon, ring
        this.slot = "";            // slot to place item into: head, chest, hand, leg
        this.name = "";            // applies to non-gold rare+ loot only
        this.rarity = "";          // rarity: common, rare, legendary, artifact
        this.stats = {};           // stats that are rolled if isItem
        this.rollItem();           // item generating method
        const msg = `${this.name} ${this.rarity} ${this.slot} ${this.type}`;
        this.toastLoot(msg);
    }

    static ID() {
        return Math.random().toString(36).substr(2, 10);
    }

    rollItem() {
        const roll = rndInt(0, 101);
        if (roll <= 10) {
            this.type = "coins";
            this.price = rndInt(10, 25) + game.level;
            game.player.gold += this.price;
            game.player.updateInfobar();
        }
        else {
            const secondRoll = rndInt(0, 101);
            if (secondRoll <= 65) {
                this.type = "armor";
                const thirdRoll = rndInt(0, 101);
                if (thirdRoll <= 25) {
                    this.slot = "head";
                }
                else if (thirdRoll > 25 && thirdRoll <= 50) {
                    this.slot = "chest";
                }
                else if (thirdRoll > 50 && thirdRoll <= 75) {
                    this.slot = "hand";
                }
                else {
                    this.slot = "leg";
                }
                this.price = rndInt(15, 40) + game.level;
            }
            else {
                this.type = "weapon";
                this.slot = "one-hand";
                this.price = rndInt(55, 125) + game.level;
            }
            this.rollRarity();
            if (this.slot === "one-hand") this.rollWeaponStats();
            else this.rollItemStats();
            this.alterStat();
            game.player.loot.push(this);
        }

    }

    rollRarity() {
        const roll = rndInt(0, 100);
        if (roll <= 60) {
            this.rarity = "common";
        }
        else if (roll > 60 && roll <= 85) {
            this.rarity = "rare";
            this.name = generateName(2);
        }
        else {
            this.rarity = "legendary";
            this.name = generateName(1)
        }
    }

    rollItemStats() {
        let stats = {
            str: Loot.rollStat(),
            vit: Loot.rollStat(),
            agi: Loot.rollStat(),
            per: Loot.rollStat()
        };
        switch (this.slot) {
            case "head":
                stats.per = Math.floor(stats.per * 1.5);
                break;
            case "chest":
                stats.vit = Math.floor(stats.vit * 1.5);
                break;
            case "hand":
                stats.str = Math.floor(stats.str * 1.5);
                break;
            case "leg":
                stats.agi = Math.floor(stats.agi * 1.5);
                break;
            default:
                break;
        }
        return Object.assign(this.stats, stats);
    }

    static rollStat() {
        return rndInt(1, 25) + game.level;
    }

    rollWeaponStats() {
        return Object.assign(this.stats,
            {
                damage: rndInt(1, 35) + game.level
            });
    }

    alterStat() {
        Object.keys(this.stats).forEach(s => this.rarity === "rare"
            ? this.stats[s] = Math.floor(this.stats[s] * 1.5)
            : this.rarity === "legendary" ? this.stats[s] *= 2 : null);
    };

    toastLoot(msg) {
        const toast = C();
        toast.className = "lootToaster";
        toast.innerHTML = msg;
        $(".holder").appendChild(toast);
        setTimeout(() => toast.classList.add("lootToaster-fade"), 500);
        setTimeout(() => toast.parentNode.removeChild(toast), 3000);
    }
}
