import {rndInt} from "./helpers";
import {game} from "./index";

const types = {
    skeleton: {
        name: "Skeleton",
        damage: rndInt(25, 40),
        hp: rndInt(75, 250)
    },
    crab: {
        name: "Crab",
        damage: rndInt(35, 50),
        hp: rndInt(75, 250)
    },
    wrath: {
        name: "Wrath",
        damage: rndInt(15, 30),
        hp: rndInt(125, 350)
    }
}

export default class Enemy {
    constructor(type) {
        this.name = this.getName(type);
        this.damage = this.getDamage(type);
        this.hp = this.getHp(type);
    }

    getName(type) {
        return types[type].name;
    }

    getDamage(type) {
        return Math.round(types[type].damage * (1 + game.player.level / 7)) + game.player.level * 2;
    }

    getHp(type) {
        return Math.round(types[type].hp * (1 + game.player.level / 7)) + game.player.level * 2;
    }
}
