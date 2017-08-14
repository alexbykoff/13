export function buildLevel() {
    const levelWrapper = document.querySelector(".level-wrapper");
    for (let i = 0; i < 9; i++) {
        const room = document.createElement("div");
        room.className = "level-room";
        room.id = `room-${i}`;
        for (let j = 0; j < 49; j++) {
            const cell = document.createElement("div");
            cell.className = "level-cell";
            if (j < 7 || j > 41 || j % 7 === 0 || (j + 1) % 7 === 0) {
                cell.classList.add("cell-wall");
            }
            cell.id = `cell-${i}-${j}`;
            //cell.innerHTML = `${i}-${j}`;
            room.appendChild(cell);
        }
        levelWrapper.appendChild(room);
    }

}