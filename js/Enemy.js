import {rndInt} from "./helpers";

export default class Enemy {
    constructor() {
        this.name = "Skeleton";
        this.damage = Math.floor(rndInt(20, 30) * .85);
        this.vit = Math.floor(rndInt(6, 35) * .65);
        this.agi = Math.floor(rndInt(6, 60) * .65);
        this.per = Math.floor(rndInt(6, 60) * .65);
        this.hp = this.vit * 25;
    }
}
