import {rndInt} from "./helpers";
import {game} from "./index";

export default class Enemy {
    constructor() {
        this.name = "Skeleton";
        this.damage = Math.round(rndInt(25, 40) * (1 + game.level / 7));
        this.hp = Math.round(rndInt(75, 250) * (1 + game.level / 7));
    }
}
