import 'fabric';
import {canvas} from '../shared/init-canvas'
declare const fabric: any;


const getMousePos = (event) =>{
  var pointer = canvas.getPointer(event.e)
  const mousePos = {
    x: pointer.x,
    y: pointer.y
  };
  return mousePos;
}

const newCircle = (event) => {
  var circle = new fabric.Circle({
    left: getMousePos(event).x - 12,
    top: getMousePos(event).y - 12,
    strokeWidth: 5,
    radius: 12,
    fill: '#fff',
    stroke: '#666',
  });
  circle.hasControls = circle.hasBorders = false;
  canvas.add(circle);
}


export {newCircle}
