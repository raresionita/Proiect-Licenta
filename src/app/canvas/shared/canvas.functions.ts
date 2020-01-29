import {canvas} from './init-canvas'

var actionType = 0
var objectSelected = null
var weight:string
var isDirected:boolean

const getMousePos = (event) =>{
  var pointer = canvas.getPointer(event.e)
  const mousePos = {
    x: pointer.x,
    y: pointer.y
  };
  return mousePos;
}

const setAction = (value) => {
  actionType = value
  if(value == 2){
    canvas.getObjects().forEach(element => {
      element.lockMovementX = false
      element.lockMovementY = false
    });
  } else{
    canvas.getObjects().forEach(element => {
      element.lockMovementX = true
      element.lockMovementY = true
    });
    objectSelected = null
  }
  canvas.discardActiveObject()
}

const setSelected = (val) => {
  objectSelected = val
}

const setWeight = (val) => {
  if(val == null){
    val = ''
    weight = val
  }else{
    weight = val
  }
}

const setDirected = (val) => {
  isDirected = val
}

export {actionType,setAction,getMousePos,objectSelected,setSelected,weight,setWeight,isDirected,setDirected}
