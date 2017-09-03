import {rndInt} from "./helpers";

export default class Enemy {
    constructor() {
        this.name = "Skeleton";
        this.damage = Math.floor(rndInt(20, 30) * .45);
        this.str = Math.floor(rndInt(10, 16) * .65);
        this.vit = Math.floor(rndInt(10, 16) * .65);
        this.agi = Math.floor(rndInt(10, 16) * .65);
        this.per = Math.floor(rndInt(10, 16) * .65);
        this.hp = this.vit * 16;
    }
}
