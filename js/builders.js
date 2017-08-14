import {rndInt} from "./helpers";

export function buildLevel(width, height) {
    const levelWrapper = document.querySelector(".level-wrapper");
    levelWrapper.style.width = width * 32 + "px";
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            const cell = document.createElement("div");
            cell.classList.add("level-cell", "free");
            cell.id = `cell-${i}-${j}`;
            if (i === 0 || i === height - 1 || j === 0 || j === width - 1) {
                cell.classList.add("cell-wall");
            }
            levelWrapper.appendChild(cell);
        }
    }
    return {width, height}
}

export function populateLevel(level) {
    let itemNumber = Math.floor(level.width * level.height / 30);
    while (itemNumber--) {
        makeThing(level);
    }
}

function makeThing(level) {
    const row = rndInt(2, level.height - 3);
    const column = rndInt(2, level.width - 3);
    const cell = document.querySelector(`#cell-${row}-${column}`);
    if ([...cell.classList].indexOf("free") === -1) {
        makeThing(level);
    }
    cell.classList.add("item");
}