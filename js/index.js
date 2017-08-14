import {buildLevel} from "./builders";
import {rndInt, positionPlayer} from "./helpers";

const level = buildLevel(rndInt(14, 24), rndInt(12, 18));
positionPlayer(1,1);
