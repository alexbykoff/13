import {rndInt, rollDice} from "./helpers";
import {game} from "./index";
import {generateName} from "./name";

export default class Loot {
    constructor() {
        this.id = Loot.createId(); // used for attr within inventory div
        this.price = 0;            // price you can sell an item for
        this.type = "";            // type of item: armor, weapon, ring
        this.slot = "";            // slot to place item into: head, chest, hand, leg
        this.name = "";            // applies to non-gold rare+ loot only
        this.rarity = "";          // rarity: common, rare, legendary, artifact
        this.stats = {};           // stats that are rolled if isItem
        this.rollItem();           // item generating method
        const msg = `${this.name} ${this.rarity} ${this.slot} ${this.type}`;
        console.log(msg);
        console.log(`Now you have ${game.player.gold} gold`);
        this.toastLoot(msg);
    }

    static createId() {
        return Math.random().toString(36).substr(2, 10);
    }

    rollItem() {
        const roll = rollDice();
        if (roll <= 50) {
            this.type = "coins";
            this.price = Math.floor(rndInt(10, 25) * game.player.level * 0.75);
            game.player.gold += this.price;

        }
        else {
            const secondRoll = rollDice();
            if (secondRoll <= 65) {
                this.type = "armor";
                const thirdRoll = rollDice();
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
                this.price = Math.floor(rndInt(15, 40) * game.player.level * 0.75);
            }
            else {
                this.type = "weapon";
                this.slot = "one-hand";
                this.price = Math.floor(rndInt(55, 125) * game.player.level * 0.75);
            }
            this.rollRarity();
            if (this.slot === "one-hand") {
                this.rollWeaponStats();
            }
            else {
                this.rollItemStats();
            }
            game.player.loot.push(this);
        }

    }

    rollRarity() {
        const roll = rollDice();
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
                stats.per = Math.floor(stats.per * 1.25);
                break;
            case "chest":
                stats.vit = Math.floor(stats.vit * 1.25);
                break;
            case "hand":
                stats.str = Math.floor(stats.str * 1.25);
                break;
            case "leg":
                stats.agi = Math.floor(stats.agi * 1.25);
                break;
            default:
                break;
        }
        return Object.assign(this.stats, stats);
    }

    static rollStat() {
        return Math.floor(rndInt(10, 16) * game.player.level * .65);
    }

    rollWeaponStats() {
        let stats = {
            damage: Math.floor(rndInt(20, 30) * game.player.level * .45)
        };
        return Object.assign(this.stats, stats);
    }

    toastLoot(msg) {
        const toast = document.createElement('div');
        toast.className = "lootToaster";
        toast.innerHTML = msg;
        document.querySelector(".holder").appendChild(toast);
        setTimeout(() => toast.classList.add("lootToaster-fade"), 500);
        setTimeout(() => toast.parentNode.removeChild(toast), 3000);
    }
}