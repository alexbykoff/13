import {rndInt, areaIsClear, $} from "./helpers";

const rooms = [];

export function buildWrapper() {
    const holder = document.querySelector(".holder");

    for (let i = 0; i < 400; i++) {
        const e = document.createElement('div');
        e.className = "cell";
        e.id = `c${Math.floor(i % 20)}-${Math.floor(i / 20)}`;
        holder.appendChild(e);
    }


}

export function createNewRandomLevel(cells, game) {
    while (document.querySelectorAll(".free").length < cells) gen();

    let playerPosition = {}, exitPosition = {};
    start:
        for (let x = 0; x < 20; x++) {
            for (let y = 0; y < 20; y++) {
                if ([...document.querySelector(`#c${x}-${y}`).classList].indexOf('free') >= 0) {
                    document.querySelector(`#c${x}-${y}`).classList.add("start");
                    playerPosition.row = y;
                    playerPosition.column = x;
                    break start;
                }
            }
        }

    finish:
        for (let x = 19; x >= 0; x--) {
            for (let y = 19; y >= 0; y--) {
                if ([...document.querySelector(`#c${x}-${y}`).classList].indexOf('free') >= 0) {
                    document.querySelector(`#c${x}-${y}`).classList.add("finish");
                    exitPosition.row = y;
                    exitPosition.column = x;
                    break finish;
                }
            }
        }
    for (let r = 0; r < rooms.length - 1; r++) {
        buildHorizontalTunnel(rooms[r].cx, rooms[r + 1].cx, rooms[r].cy);
        buildVerticalTunnel(rooms[r].cy, rooms[r + 1].cy, rooms[r + 1].cx);
    }

    return Object.assign(game, [playerPosition, exitPosition]);
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


function gen() {
    let w = Math.floor(Math.random() * 4) + 3;
    let h = Math.floor(Math.random() * 4) + 3;

    // make size odd to have proper room centre
    if (!(w % 2)) w += 1;
    if (!(h % 2)) h += 1;

    let x = Math.floor(Math.random() * (19 - w)) + 1;
    let y = Math.floor(Math.random() * (19 - h)) + 1;

    for (let i = y; i < y + h; i++) {
        for (let j = x; j < x + w; j++) {
            const c = document.querySelector(`#c${j}-${i}`);
            c.classList.add("free");
        }
    }

    rooms.push({
        cx: x + Math.floor(w / 2),
        cy: y + Math.floor(h / 2)
    })
}

function buildHorizontalTunnel(x1, x2, y) {
    let newx1 = Math.min(x1, x2);
    let newx2 = Math.max(x1, x2);
    for (let x = newx1; x <= newx2; x++) {
        document.querySelector(`#c${x}-${y}`).classList.add("free")
    }
}

function buildVerticalTunnel(y1, y2, x) {
    let newy1 = Math.min(y1, y2);
    let newy2 = Math.max(y1, y2);
    for (let y = newy1; y <= newy2; y++) {
        document.querySelector(`#c${x}-${y}`).classList.add("free")
    }
}