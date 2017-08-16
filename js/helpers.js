export const rndInt = (min, max) => Math.floor(Math.random() * (max - min) + min);

export const updateNeighbors = (row, column) => {
  const neighbors = [
    { x: row - 1, y: column },
    { x: row, y: column + 1 },
    { x: row + 1, y: column },
    { x: row, y: column - 1 },
    { x: row - 1, y: column - 1 },
    { x: row + 1, y: column + 1 },
    { x: row - 1, y: column + 1 },
    { x: row + 1, y: column - 1 },
  ];

  neighbors.forEach(cell => {
    const div = document.querySelector(`#cell-${cell.x}-${cell.y}`);
    if (div) div.classList.remove("fade");
  });
}

export const positionPlayer = (row, column, game) => {
    const newPosition = document.querySelector(`#cell-${row}-${column}`);
    const oldPosition = document.querySelector(`#cell-${game.playerPosition.row || 1}-${game.playerPosition.column || 1}`);

    if ([...newPosition.classList].indexOf("free") >= 0) {
        oldPosition.classList.remove("player", "fade");
        oldPosition.classList.add("free");
        newPosition.classList.remove("free", "fade");
        newPosition.classList.add("player");
        game.playerPosition = Object.assign(game.playerPosition, {row, column});
        updateNeighbors(row, column);
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
