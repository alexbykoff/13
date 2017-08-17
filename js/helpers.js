export const $ = e => document.querySelector(e);

export const rndInt = (min, max) => Math.floor(Math.random() * (max - min) + min);

export const getNearCells = (row, column) => [
    { x: row - 1, y: column },
    { x: row, y: column + 1 },
    { x: row + 1, y: column },
    { x: row, y: column - 1 },
    { x: row - 1, y: column - 1 },
    { x: row + 1, y: column + 1 },
    { x: row - 1, y: column + 1 },
    { x: row + 1, y: column - 1 },
];

const updateNeighbours = (row, column) => {
    getNearCells(row, column).forEach(cell => {
    const div = $(`#cell-${cell.x}-${cell.y}`);
    div && div.classList.remove("fade");
  });
};

export const positionPlayer = (row, column, game) => {
    const newPosition = $(`#cell-${row}-${column}`);
    const oldPosition = $(`#cell-${game.playerPosition.row || 1}-${game.playerPosition.column || 1}`);

    if ([...newPosition.classList].indexOf("free") >= 0) {
        oldPosition.classList.remove("player", "fade");
        oldPosition.classList.add("free");
        newPosition.classList.remove("free", "fade");
        newPosition.classList.add("player");
        game.playerPosition = Object.assign(game.playerPosition, {row, column});
        updateNeighbours(row, column);
    }
};

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
