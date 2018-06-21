"use strict";
import Move from '../move.mjs';

class Player {
  constructor(c, e, depth) {
    this._color = c;
    this._engine = e;
    this._depth = depth;
  }

  move() {
    let possibleMoves = this._engine.get_possible_move_list();
    let chosenMove = null; // possibleMoves[Math.floor(Math.random() * (possibleMoves.length - 1))];
    let score0 = -10000000;
    let score_tempo0;

    for (let i = 0; i < possibleMoves.length - 1; i++) {
      let clone = this._engine.clone();
      score_tempo0 = this._get_score(possibleMoves[i], clone, this._depth - 1, 1, score0);
      if (score_tempo0 >= score0) {
        score0 = score_tempo0;
        chosenMove = possibleMoves[i];
      }
    }
    return chosenMove;
  }

  _get_score(move, aclone, depth, turn, score_parent) {
    let score1 = 0;
    let list;
    let next_turn = -turn;
    let score_tempo1 = next_turn * 10000;

    aclone.move(move);
    if (depth === 0) {
      return this._evaluer(move, aclone, turn, depth);
    }
    if (aclone._carre(move)) {
      return turn * Math.pow(100, depth);
    }
    list = aclone.get_possible_move_list();
    for (let i = 0; i < list.length - 1; i++) {
      let clone1 = aclone.clone();

      score_tempo1 = this._get_score(list[i], clone1, depth - 1, next_turn, score1);
      if (turn > 0) {
        if (score_tempo1 <= score1) {
          score1 = score_tempo1;
        }
        if (score1 > score_parent) {
          break;
        }
      } else {
        if (score_tempo1 >= score1) {
          score1 = score_tempo1;
        }
        if (score1 < score_parent) {
          break;
        }
      }
    }
    return score1;
  }

  _evaluer(move, clone2, turn, depth) {
    let score2 = 0;
    if (clone2._carre(move)) {
      score2 = turn * Math.pow(100, depth);
    }
    score2 = score2 + turn * clone2._color_count[parseInt(move._color)];
    return score2;
  }
}

export default Player;

