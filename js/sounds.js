const audio = new Audio();
export function play(s) {
    audio.src = jsfxr(s);
    audio.play();
}

const fx = {
    introSound: [3, 0.0657, 1, 0.06, 0.7817, 0.54, , -0.3399, -1, , 0.4554, -0.88, 0.9133, 0.734, -0.1241, 0.44, -0.2199, -0.5991, 0.16, , 0.9167, , 0.02, 0.5]
};

export default fx;
