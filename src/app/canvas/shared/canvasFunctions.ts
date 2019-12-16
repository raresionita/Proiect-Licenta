import 'fabric';
import {canvas} from '../shared/init-canvas'

declare const fabric: any;
var circles = new Map<number,CircleCustom>()

class CircleCustom{
  circle = null
  text = null
  group = null
  constructor(event,id){
    this.circle = new fabric.Circle({
      radius: 15, fill: '#33C7FF',
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

  colorSelected = () => {
    this.circle.set({
      fill: '#FF0000'
    })
  }

  colorSelected2 = () => {
    this.circle.set({
      fill: "#33C7FF"
    })
  }
}

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
}

//
//try to make line (edge) between circles
//
var lines = []


const makeLine = (event) => {
  var cds = [getMousePos(event).x, getMousePos(event).y, getMousePos(event).x, getMousePos(event.y)];
  var line = new fabric.Line(cds, {
    fill: "black",
    stroke: "black",
    strokeWidth: 5,
    selectable: false,
    evented: false
  });
}

export {newCircle,circles}
