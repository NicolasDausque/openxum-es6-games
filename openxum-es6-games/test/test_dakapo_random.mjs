import lib from '../lib/openxum-core/openxum';

let cpt=0;

for (let i=0; i<20000; i++){
let e = new lib.OpenXum.Dakapo.Engine(0,0);
let p1 = new lib.OpenXum.RandomPlayer(0, e);
let p2 = new lib.OpenXum.Dakapo.IA.IADakapo.IADakapoPlayer(0, e,2);
let p = p1;
let moves = [];

while (!e.is_finished()) {
  let move = p.move();

  moves.push(move);
  e.move(move);
  p = p === p1 ? p2 : p1;
}

if(e.winner_is() % 2 ===0){
  cpt++;
}

}


console.log(cpt/200);
console.log((20000-cpt)/200);