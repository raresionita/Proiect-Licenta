import 'fabric';
import { getMousePos } from './canvas.functions';
import { canvas } from './init-canvas';

declare const fabric: any;

var circles = []

class CircleCustom{
  circle = null
  text = null
  group = null

  constructor(event,id){
    this.createVertex(event,id)
  }

  createVertex = (event,id) => {
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

  //color circle RED
  colorSelected = () => {
    this.circle.set({
      fill: '#FF0000'
    })
  }
}

const newCircle = (event,id) => {
    var circleCustom = new CircleCustom(event,id)
    circles[id] = circleCustom
    canvas.add(circleCustom.group)
  }

export {circles,newCircle}