import {game} from "./index";
import {rndInt} from "./helpers";

export default class Enemy {
    constructor(){
        this.name = "Skeleton";
        this.damage = Math.floor(rndInt(20, 30) * game.player.level * .45);
        this.str = Math.floor(rndInt(10, 16) * game.player.level * .65);
        this.vit = Math.floor(rndInt(10, 16) * game.player.level * .65);
        this.agi = Math.floor(rndInt(10, 16) * game.player.level * .65);
        this.per = Math.floor(rndInt(10, 16) * game.player.level * .65);
        this.hp = this.vit * 12;
    }
}