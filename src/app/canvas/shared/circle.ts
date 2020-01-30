import 'fabric';
import { getMousePos } from './canvas.functions';

declare const fabric: any;

class CircleCustom{
  circle = null
  text = null
  group = null

  constructor(event,id){
    this.createVertex(event,id)
  }

  //To draw directed line, try to group the line with triangle

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
      hasControls: false,
      hasBorders: false
    })
  }

  //color circle RED
  colorSelected = () => {
    this.circle.set({
      fill: '#FF0000'
    })
  }

  //color circle default
  updateColor = () => {
    this.circle.set({
      fill: '#33C7FF'
    });
  }

  getId = () => {
    return this.group.id
  }
}

export default CircleCustom
