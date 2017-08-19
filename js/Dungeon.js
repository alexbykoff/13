export default class Dungeon {
    constructor(side) {
        this.side = side;
        this.player = {};
        this.exit = {};
        this.rooms = [];
    }

    initialize() {
        const holder = document.querySelector(".holder");
        for (let i = 0; i < this.side * this.side; i++) {
            const e = document.createElement('div');
            e.className = "cell";
            e.id = `c${Math.floor(i % this.side)}-${Math.floor(i / this.side)}`;
            holder.appendChild(e);
        }
    };

    buildNewRoom(cells) {
        while (document.querySelectorAll(".free").length < cells) this.generate();

        start:
            for (let x = 0; x < 20; x++) {
                for (let y = 0; y < 20; y++) {
                    if ([...document.querySelector(`#c${x}-${y}`).classList].indexOf('free') >= 0) {
                        document.querySelector(`#c${x}-${y}`).classList.add("start");
                        this.player.x = x;
                        this.player.y = y;
                        break start;
                    }
                }
            }

        finish:
            for (let x = 19; x >= 0; x--) {
                for (let y = 19; y >= 0; y--) {
                    if ([...document.querySelector(`#c${x}-${y}`).classList].indexOf('free') >= 0) {
                        document.querySelector(`#c${x}-${y}`).classList.add("finish");
                        this.exit.x = x;
                        this.exit.y = y;
                        break finish;
                    }
                }
            }
        for (let r = 0; r < this.rooms.length - 1; r++) {
            this.buildHorizontalTunnel(this.rooms[r].cx, this.rooms[r + 1].cx, this.rooms[r].cy);
            this.buildVerticalTunnel(this.rooms[r].cy, this.rooms[r + 1].cy, this.rooms[r + 1].cx);
        }
    };

    generate() {
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

        this.rooms.push({
            cx: x + Math.floor(w / 2),
            cy: y + Math.floor(h / 2)
        })
    };

    buildHorizontalTunnel(x1, x2, y) {
        let newx1 = Math.min(x1, x2);
        let newx2 = Math.max(x1, x2);
        for (let x = newx1; x <= newx2; x++) {
            document.querySelector(`#c${x}-${y}`).classList.add("free")
        }
    };

    buildVerticalTunnel(y1, y2, x) {
        let newy1 = Math.min(y1, y2);
        let newy2 = Math.max(y1, y2);
        for (let y = newy1; y <= newy2; y++) {
            document.querySelector(`#c${x}-${y}`).classList.add("free")
        }
    };

}