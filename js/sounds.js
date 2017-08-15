import "./jsfxr.min";
const audio = new Audio();

export function play(s) {
    audio.src = jsfxr(s);
    audio.play();
}

const fx = {
    introSound: [3, 0.0657, 1, 0.06, 0.7817, 0.54, , -0.3399, -1, , 0.4554, -0.88, 0.9133, 0.734, -0.1241, 0.44, -0.2199, -0.5991, 0.16, , 0.9167, , 0.02, 0.5],
    coinSound: [0, , 0.0858, 0.3519, 0.4919, 0.6174, , , , , , 0.3313, 0.6645, , , , , , 1, , , , , 0.5]
};

export default fx;
