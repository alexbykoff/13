export function rndInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

export function positionPlayer(x, y) {
    const newPosition = document.querySelector(`#cell-${x}-${y}`);
    if ([...newPosition.classList].indexOf("free") >= 0) {
        newPosition.classList.remove("free");
        newPosition.classList.add("player");
    }
}