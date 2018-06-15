"use strict";

import OpenXum from '../../openxum/manager.mjs';
import Dakapo from '../../../openxum-core/games/dakapo/index.mjs';

class Manager extends OpenXum.Manager {
    constructor(e, g, o, s) {
        super(e, g, o, s);
        this.that(this);
    }

    build_move() {
        return new Dakapo.Move();
    }

    get_current_color() {
        return this._engine.current_color();
    }

    static get_name() {
        return 'dakapo';
    }

    get_winner_color() {
        return this._engine._turn % 2 === 0 ? 'Joueur 1' : 'Joueur 2';
    }

    process_move() {
        //a quoi sert elle?
    }
}

export default {
    Manager: Manager
};