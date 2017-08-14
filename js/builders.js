export function buildLevel(width, height) {
    const levelWrapper = document.querySelector(".level-wrapper");
    levelWrapper.style.width = width * 32 + "px";
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            const cell = document.createElement("div");
            cell.className = "level-cell";
            cell.id = `cell-${i}-${j}`;
            if (i === 0 || i === height - 1 || j === 0 || j === width - 1) {
                cell.classList.add("cell-wall");
            }
            levelWrapper.appendChild(cell);
        }
    }
}
