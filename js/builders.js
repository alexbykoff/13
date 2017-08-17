import {rndInt, areaIsClear, $} from "./helpers";

export function buildLevel(width, height) {
    const levelWrapper = $(".level-wrapper");
    levelWrapper.style.width = width * 32 + "px";
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            const cell = document.createElement("div");
            cell.id = `cell-${i}-${j}`;
            if (!i || i === height - 1 || !j || j === width - 1) {
                cell.classList.add("cell-wall", "level-cell");
            } else {
                cell.classList.add("free", "level-cell", "fade");
            }
            levelWrapper.appendChild(cell);
        }
    }
    return {width, height}
}


export function populateLevel(level) {

    /*place random objects while keeping the distance of 1 cell at least*/

    let itemNumber = Math.floor(level.width * level.height / 20);
    while (itemNumber) {
        const row = rndInt(2, level.height - 2);
        const column = rndInt(2, level.width - 2);
        if (areaIsClear(row, column)) {
            const cell = $(`#cell-${row}-${column}`);
            cell.classList.add("item");
            cell.classList.remove("free");
            itemNumber--;
        }
    }

}
