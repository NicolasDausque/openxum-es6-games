import lib from '../lib/openxum-core/openxum';

let e = new lib.OpenXum.Dakapo.Engine();

console.log("Arthur");
let move=(lib.OpenXum.Dakapo.Color.GREEN, 4,5);
e.move(move);

console.log(move);

