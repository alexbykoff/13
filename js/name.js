import {rndInt} from "./helpers";

const vow = "AEIOU".split("");
const con = "BCDFGHJKLMNPRSTVWX".split("");

export const generateName = words => {
    let word = "";
    while (words--) {
        for (let i = 0; i < rndInt(4, 7); i++) {
            word += i % 2 ? vow[rndInt(0, vow.length)] : con[rndInt(0, con.length)];
        }
        words && (word += " ");
    }
    return word
};
