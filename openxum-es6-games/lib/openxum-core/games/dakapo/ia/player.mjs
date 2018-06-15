"use strict";
import Color from '../color.mjs';

class Player {
    constructor(c, e, depth) {
        this._color = c;
        this._engine = e;
        this._depth = depth;
    }

    move() {
        let possibleMoves = this._engine.get_possible_move_list();
        let chosenMove = possibleMoves[Math.floor(Math.random() * (possibleMoves.length - 1))];
        let clone = this._engine.clone();
        for (let i = 0; i < possibleMoves.length-1; i++) {
            if (clone._carre(possibleMoves[i]) === true) {
                chosenMove = possibleMoves[i];
                break;
            }
        }


        return chosenMove;
    }


}

export default Player;

