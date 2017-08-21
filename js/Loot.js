import {rndInt, rollDice} from "./helpers";
import {game} from "./index";
import {generateName} from "./name";

export default class Loot {
    constructor() {
        this.id = this.createId(); // used for attr within inventory div
        this.price = 0;            // price you can sell an item for
        this.type = "";            // type of item: armor, weapon, ring
        this.slot = "";            // slot to place item into: head, chest, hand, leg
        this.name = "";            // applies to non-gold rare+ loot only
        this.isItem = false;       // if loot is non-gold then set this to true
        this.rarity = "";          // rarity: common, rare, legendary, artifact
        this.color = "#000";       // depends on rarity
        this.stats = {};           // stats that are rolled if isItem
        this.rollItem();           // item generating method
        const msg = `${this.rarity} ${this.name} ${this.slot} ${this.type} worth of ${this.price}g`;
        console.log(msg);
        console.log(`Now you have ${game.player.gold} gold`);
        this.toastLoot(msg);
    }

    createId() {
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
                this.slot ="weapon";
                this.price = Math.floor(rndInt(55, 125) * game.player.level * 0.75);
            }
            this.isItem = true;
            this.rollRarity();
            this.rollItemStats();
            game.player.loot.push(this);
        }

    }

    rollRarity() {
        const roll = rollDice();
        if (roll <= 60) {
            this.rarity = "common";
            this.color = "#0b6312";
        }
        else if (roll > 60 && roll <= 85) {
            this.rarity = "rare";
            this.color = "#0b146e";
            this.name = generateName(2);
        }
        else {
            this.rarity = "legendary";
            this.color = "#8c3e1a";
            this.name = generateName(1)
        }
    }

    rollItemStats() {
        let stats = {
            str: this.rollStat(),
            vit: this.rollStat(),
            agi: this.rollStat(),
            per: this.rollStat()
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

    rollStat() {
        return Math.floor(rndInt(10, 16) * game.player.level * .65);
    }

    toastLoot(msg) {
        const toast = document.createElement('div');
        toast.className = "lootToaster";
        toast.innerHTML = msg;
        toast.style.backgroundColor = this.color;
        document.querySelector(".holder").appendChild(toast);
        setTimeout(() => toast.parentNode.removeChild(toast), 3000);
    }
}