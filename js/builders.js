export function buildLevel() {
    const levelWrapper = document.querySelector(".level-wrapper");
    for (let i = 0; i < 9; i++) {
        const room = document.createElement("div");
        room.className = "level-room";
        room.id = `room-${i}`;
        for (let j = 0; j < 49; j++) {
            const cell = document.createElement("div");
            cell.className = "level-cell";
            if (j > 41 || !((j + 1) % 7 ) && !needPass(i, j)) {
                cell.classList.add("cell-wall");
            }

            cell.id = `cell-${i}-${j}`;
            cell.innerHTML = `${j}`;
            room.appendChild(cell);
        }
        levelWrapper.appendChild(room);
    }

}

function needPass(i, j) {
    if (!((i + 1) % 3 === 0) && i < 6) {
        if (j === 27 || j == 44) return true;
    }
    if (i > 5 && i !== 8) {
        if (j == 27) return true;
    }
    if ((i + 1) % 3 === 0 && i !== 8) {
        if (j == 44) return true;
    }

}

