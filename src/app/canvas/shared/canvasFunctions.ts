import 'fabric';
import {canvas} from '../shared/init-canvas'
declare const fabric: any;

// export function makeCircle(left:any, top:any, line1:any, line2:any, line3:any, line4:any){
//     var c = new fabric.Circle({
//       left: left,
//       top: top,
//       strokeWidth: 5,
//       radius: 12,
//       fill: '#fff',
//       stroke: '#666'
//     });

//     c.hasControls = c.hasBorders = false;

//     c.line1 = line1;
//     c.line2 = line2;
//     c.line3 = line3;
//     c.line4 = line4;

//     return c;
// }

// export function makeLine(coords){
//     return new fabric.Line(coords, {
//       fill: 'red',
//       stroke: 'red',
//       strokeWidth: 5,
//       selectable: false,
//       evented: false,
//     });
// }

/*Important*/
const drawCircle = (event)=>{
  var pointer = canvas.getPointer(event.e);
  const mousePos = {
    x: pointer.x,
    y: pointer.y
  };
  console.log(event);
  var circle = new fabric.Circle({
    left: mousePos.x - 20,
    top: mousePos.y - 20,
    radius: 20,
    fill: 'red',
  });
  circle.hasControls = circle.hasBorders = false;
  canvas.add(circle);
}

export {drawCircle}
