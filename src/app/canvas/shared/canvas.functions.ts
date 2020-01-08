import {canvas} from './init-canvas'

var actionType = 0

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
}

export {actionType,setAction,getMousePos}