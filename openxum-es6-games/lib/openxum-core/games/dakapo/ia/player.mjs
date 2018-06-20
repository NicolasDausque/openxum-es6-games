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
    let chosenMove = possibleMoves[Math.floor(Math.random() * (possibleMoves.length - 1))];
    let clone = this._engine.clone();
    let score = -1000000000;
    let score_tempo;

    for (let i = 0; i < possibleMoves.length - 1; i++) {
      if (this._engine._carre(possibleMoves[i])) {
        chosenMove = possibleMoves[i];
        break;
      }
      score_tempo = this._get_score(possibleMoves[i], clone, this._depth - 1, -1, score);
      if (score_tempo > score) {
        score = score_tempo;
        chosenMove = possibleMoves[i];
      }
    }
    return chosenMove;
  }

  _get_score(move, aclone, depth, turn, score_parent) {
    let score = 0;
    let list;

    aclone.move(move);
    if (depth === 0) {
      return this._evaluer(move, aclone, turn);
    }
    if (aclone._carre(move)) {
      return turn * 100 * (10 ^ depth);
    }
    list = aclone.get_possible_move_list();
    for (let i = 0; i < list.length - 1; i++) {
      let score_tempo = this._get_score(list[i], aclone, depth - 1, -turn, score);
      if (turn * score_tempo >= turn * score) {
        score = score_tempo;
      }
      if (score * turn > score_parent * turn) {
        break;
      }
    }
    return score;
  }

  _evaluer(move, clone, turn, depth) {
    let score = 0;
    if (clone._carre(move)) {
      score = turn * 100 * (10 ^ depth);
    }
    score = score + turn * (7 - Math.abs((move._abs + move._ord) - 7));
    return score;
  }

}

export default Player;

