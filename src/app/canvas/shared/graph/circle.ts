import 'fabric';

declare const fabric: any;

class CircleCustom{
  circle = null
  text = null
  group = null

  constructor(left,top,id){
    this.createVertex(left,top,id)
  }

  createVertex = (left,top,id) => {
    this.circle = new fabric.Circle({
      radius: 15, fill: '#33C7FF',
      originX: 'center',  originY: 'center'
    });
    this.text = new fabric.Text(id.toString(),{
      fontSize: 20, fill: '#000000',
      originX: 'center', originY: 'center'
    })
    this.group = new fabric.Group([this.circle,this.text], {
      id: id,
      left: left,
      top: top,
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

  setLeft = (left) => {
    this.group.left = left
  }

  setTop = (top) => {
    this.group.top = top
  }

  getLeft = () => {
    return this.group.left
  }

  getTop = () => {
    return this.group.top
  }
}

export default CircleCustom
