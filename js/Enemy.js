import {rndInt} from "./helpers";

export default class Enemy {
    constructor() {
        this.name = "Skeleton";
        this.damage = rndInt(25, 40);
        this.hp = rndInt(75, 650)
    }
}
