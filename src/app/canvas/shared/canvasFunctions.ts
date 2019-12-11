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
    strokeWidth: 5, radius: 15, fill: '#33C7FF', stroke: '#33C7FF ',
    originX: 'center',  originY: 'center'
  });
  var text = new fabric.Text(id.toString(),{
    fontSize: 20, fill: '#FFDA33',
    originX: 'center', originY: 'center'
  })
  var group = new fabric.Group([circle,text], {
    id: id,
    left: getMousePos(event).x-15,
    top: getMousePos(event).y-15,
  })
  group.hasControls = group.hasBorders = false;
  canvas.add(group);
  //console.log(group.id);
}

export {newCircle}
