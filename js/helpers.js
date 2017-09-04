export const $ = e => document.querySelector(e);
export const C = e => document.createElement('div');
export const rndInt = (min, max) => Math.floor(Math.random() * (max - min) + min);

const getNearCells = (cx, cy) => [
    {x: cx - 1, y: cy},
    {x: cx, y: cy + 1},
    {x: cx + 1, y: cy},
    {x: cx, y: cy - 1},
    {x: cx - 1, y: cy - 1},
    {x: cx + 1, y: cy + 1},
    {x: cx - 1, y: cy + 1},
    {x: cx + 1, y: cy - 1},
];

export const cellIsFree = (x,y) => [...$(`#c${x}-${y}`).classList].indexOf("free") >=0;

export const updateNeighbours = (x, y) => {
    getNearCells(x, y).forEach(cell => {
        const div = $(`#c${cell.x}-${cell.y}`);
        div && div.classList.remove("fade");
    });
};