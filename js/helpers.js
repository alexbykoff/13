export const $ = e => document.querySelector(e);
export const C = e => document.createElement('div');
export const rndInt = (min, max) => Math.floor(Math.random() * (max - min) + min);
export const rollDice = () => Math.floor(Math.random() * 101);

const getNearCells = (cellX, cellY) => [
    {x: cellX - 1, y: cellY},
    {x: cellX, y: cellY + 1},
    {x: cellX + 1, y: cellY},
    {x: cellX, y: cellY - 1},
    {x: cellX - 1, y: cellY - 1},
    {x: cellX + 1, y: cellY + 1},
    {x: cellX - 1, y: cellY + 1},
    {x: cellX + 1, y: cellY - 1},
];

export const cellIsFree = (x,y) => [...$(`#c${x}-${y}`).classList].indexOf("free") >=0;

export const updateNeighbours = (x, y) => {
    getNearCells(x, y).forEach(cell => {
        const div = $(`#c${cell.x}-${cell.y}`);
        div && div.classList.remove("fade");
    });
};

// export const areaIsClear = (x, y) => {
//     let clear = true;
//     getNearCells(x, y).forEach(cell => {
//         const div = $(`#c${cell.x}-${cell.y}`);
//         if (div && [...div.classList].indexOf("free") === -1) {
//             clear = false;
//         }
//     });
//     return clear
// };
