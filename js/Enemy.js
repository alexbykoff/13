import {rndInt} from "./helpers";
import {game} from "./index";

const types = {
    skeleton: {
        name: "Skeleton",
        damage: rndInt(25, 45),
        hp: rndInt(75, 260)
    },
    crab: {
        name: "Crab",
        damage: rndInt(40, 58),
        hp: rndInt(55, 240)
    },
    wrath: {
        name: "Wrath",
        damage: rndInt(22, 35),
        hp: rndInt(125, 365)
    }
};

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
        return Math.round(types[type].damage * (1 + game.player.level / 6)) + game.player.level * 2;
    }

    getHp(type) {
        return Math.round(types[type].hp * (1 + game.player.level / 6)) + game.player.level * 2;
    }
}
