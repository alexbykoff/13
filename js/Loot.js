import {rndInt, rollDice} from "./helpers";
import {game} from "./index";
import {generateName} from "./name";

export default class Loot {
    constructor() {
        this.id = this.createId(); // used for attr within inventory div
        this.price = 0; // price you can sell an item for
        this.type = "";
        this.name = ""; // applies to non-gold loot only
        this.isItem = false; // if loot is not gold then set this to true
        this.rarity = "";
        this.color = "#000";
        this.rollItem();
        const msg = `${this.rarity} ${this.name} ${this.type} worth of ${this.price}g`;
        console.log(msg);
        console.log(`Now you have ${game.player.gold} gold`);
        this.toastLoot(msg);
    }

    createId() {
        return Math.random().toString(36).substr(2, 10);
    }

    rollItem() {
        let type, price;
        const roll = rollDice();
        if (roll <= 65) {
            type = "coins";
            price = Math.floor(rndInt(10, 25) * game.player.level * 0.75);
            game.player.gold += price;

        }
        else {
            const secondRoll = rollDice();
            if (secondRoll <= 60) {
                type = "armor";
                price = Math.floor(rndInt(15, 40) * game.player.level * 0.75);
            }
            else {
                type = "weapon";
                price = Math.floor(rndInt(55, 125) * game.player.level * 0.75);
            }
            this.isItem = true;
            this.rollRarity();
        }
        this.type = type;
        this.price = price;
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

    toastLoot(msg) {
        const toast = document.createElement('div');
        toast.className = "lootToaster";
        toast.innerHTML = msg;
        toast.style.backgroundColor = this.color;
        document.querySelector(".holder").appendChild(toast);
        setTimeout(() => toast.parentNode.removeChild(toast), 3000);
    }
}