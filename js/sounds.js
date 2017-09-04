import "./jsfxr.min";

const audio = new Audio();

export function play(s) {
    audio.src = jsfxr(s);
    audio.play();
}

const fx = {
    coinSound: [0, , 0.0858, 0.3519, 0.4919, 0.6174, , , , , , 0.3313, 0.6645, , , , , , 1, , , , , 0.5],
    hitSound: [1, , 0.0651, , 0.1751, 0.2774, , -0.456, , , , , , , , , , , 1, , , , , 0.5],
    victorySound: [0, , 0.3406, , 0.4373, 0.4871, , 0.1043, , 0.619, 0.5411, , , 0.4838, , , , , 1, , , , , 0.5]
};

export default fx;
