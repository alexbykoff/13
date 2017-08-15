export const rndInt = (min, max) => Math.floor(Math.random() * (max - min) + min);

export const positionPlayer = (row, column, game) => {
    const newPosition = document.querySelector(`#cell-${row}-${column}`);
    const oldPosition = document.querySelector(`#cell-${game.playerPosition.row || 1}-${game.playerPosition.column || 1}`);
    if ([...newPosition.classList].indexOf("free") >= 0) {
        oldPosition.classList.remove("player");
        oldPosition.classList.add("free");
        newPosition.classList.remove("free");
        newPosition.classList.add("player");
        game.playerPosition = Object.assign(game.playerPosition, {row, column});
    }
};

const vow = "AEIOU".split("");
const con = "BCDFGHJKLMNPRSTVWX".split("");

export const generateName = words => {
    let word = "";
    while (words--) {
        for (let i = 0; i < Math.floor(Math.random() * 6 + 3); i++) {
            word += i % 2 ? vow[Math.floor(Math.random() * vow.length)] : con[Math.floor(Math.random() * con.length)];
        }
        words && (word += " ");
    }
    return word
};

