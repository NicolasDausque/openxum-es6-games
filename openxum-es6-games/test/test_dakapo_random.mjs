import lib from '../lib/openxum-core/openxum';

let e = new lib.OpenXum.Dakapo.Engine();

console.log(e);
let c, x, y;
while(e._phase=== lib.OpenXum.Dakapo.Phase.EN_COURS) {
    c=Math.floor(Math.random() * 3+1);
    x=Math.floor(Math.random() * 8);
    y=Math.floor(Math.random() * 8);

    let move=new lib.OpenXum.Dakapo.Move(c,x,y);
    e.move(move);

}

console.log(c , x , y);
console.log(e);
