import 'fabric';
import {canvas} from '../shared/init-canvas'
declare const fabric: any;
var circles = new Map<number,CircleCustom>()

const getMousePos = (event) =>{
  var pointer = canvas.getPointer(event.e)
  const mousePos = {
    x: pointer.x,
    y: pointer.y
  };
  return mousePos;
}

const newCircle = (event,id) => {
  var circleCustom = new CircleCustom(event,id)
  circles[id] = circleCustom
  canvas.add(circleCustom.group)
  //canvas.add(group);
  //console.log(group.id);
}

class CircleCustom{
  circle = null
  text = null
  group = null
  showPussy = () => {
    this.circle.set({
      fill: "#ff0000",
      stroke : "#FF0000"
    })
  }
  constructor(event,id){
    this.circle = new fabric.Circle({
      strokeWidth: 5, radius: 15, fill: '#33C7FF', stroke: '#33C7FF ',
      originX: 'center',  originY: 'center'
    });
    this.text = new fabric.Text(id.toString(),{
      fontSize: 20, fill: '#FFDA33',
      originX: 'center', originY: 'center'
    })
    this.group = new fabric.Group([this.circle,this.text], {
      id: id,
      left: getMousePos(event).x-15,
      top: getMousePos(event).y-15,
    })
    this.group.hasControls = this.group.hasBorders = false;
  }
}

export {newCircle,circles}
