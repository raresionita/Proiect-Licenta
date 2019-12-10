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

const newCircle = (event,id) => {
  var circle = new fabric.Circle({
    strokeWidth: 5,
    radius: 15,
    fill: '#fff',
    stroke: '#666',
    originX: 'center',
    originY: 'center'
  });
  var text = new fabric.Text(id.toString(),{
    fontSize: 15,
    originX: 'center',
    originY: 'center'
  })
  var group = new fabric.Group([circle,text], {
    left: getMousePos(event).x-15,
    top: getMousePos(event).y-15,
  })
  group.hasControls = group.hasBorders = false;
  canvas.add(group);
  //console.log(id);
}



export {newCircle}
