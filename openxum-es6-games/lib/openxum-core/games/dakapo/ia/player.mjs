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
        let score=-99999;
        this._cpt=0;
        for (let i = 0; i < possibleMoves.length-1; i++) {
            if ( this._engine._carre(possibleMoves[i]) === true ){
                chosenMove = possibleMoves[i];
                break;
            }
            let score_tempo = this._get_score(possibleMoves[i], clone, this._depth, -1);
            if ( score_tempo >= score) {
                score = score_tempo;
                chosenMove = possibleMoves[i];
            }
        }
        return chosenMove;
    }


    _get_score(move, aclone, depth, turn){

        if ( aclone._carre(move) === true ){
            if ( turn > 0){
                return 10000;
            }
            else if ( turn < 0){
                return -10000;
            }
        }

        aclone.move(move);
        let clone = aclone.clone();
        let list = clone.get_possible_move_list();


        if(depth === 0) {
            if ( turn > 0){
                return this._evaluer_max(list, clone);
            }
            else if ( turn < 0){
                return this._evaluer_min(list, clone);
            }
        }

        let score=0;
        for (let i = 0; i < list.length-1; i++) {
            if ( turn > 0) {
                let score_tempo = this._get_score(list[i], clone, depth - 1, turn * (-1));

                if (score_tempo >= score) {
                    score = score_tempo;
                }
            }
            else if ( turn < 0){
                let score_tempo = this._get_score(list[i], clone, depth - 1, turn * (-1));

                if (score_tempo <= score) {
                    score = score_tempo;
                }
            }
        }
        return score;
    }

    _evaluer_min(list, clone){
        let score=0;
        for (let i = 0; i < list.length-1; i++) {
            if ( clone._carre(list[i]) === true){
                score = score - 1000;
            }
        }
        return score;
    }

    _evaluer_max(list, clone){
        let score=0;
        for (let i = 0; i < list.length-1; i++) {
            if ( clone._carre(list[i]) === true){
                score = score + 1000;
            }
        }
        return score;
    }


}

export default Player;

