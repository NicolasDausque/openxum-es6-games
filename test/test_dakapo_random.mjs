import lib from '../lib/openxum-core/openxum';

let e = new lib.OpenXum.Dakapo.Engine();

console.log(e);

e.move(new lib.OpenXum.Dakapo.Move(lib.OpenXum.Dakapo.Color.BLUE,4,5));

console.log(e);
