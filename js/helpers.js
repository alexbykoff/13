import game from "./index";

export const rndInt = (min, max) => Math.floor(Math.random() * (max - min) + min);

export const positionPlayer = (row, column, game) => {
    const newPosition = document.querySelector(`#cell-${row}-${column}`);
    const oldPosition = document.querySelector(`#cell-${game.playerPosition.row || 1}-${game.playerPosition.column || 1}`);
    if (checkCell(row, column)) {
        console.log("moving");
        oldPosition.classList.remove("player");
        oldPosition.classList.add("free");
        newPosition.classList.remove("free");
        newPosition.classList.add("player");

        return game.playerPosition = Object.assign(game.playerPosition, {row, column});
    }

};


const checkCell = (row, column) => {
    const check = document.querySelector(`#cell-${row}-${column}`);
    return ([...check.classList].indexOf("free") >= 0)
};