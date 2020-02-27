import {canvas} from './init-canvas'
import EdgeCustom from './edge'

var actionType = 0
var objectSelected = null
var weight:any
var isDirected:string
var exists:EdgeCustom
var Id = 0

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

const setExists = (val) => {
  exists = val
}

const getExists = () => {
  return exists
}

const setId = (val) => {
  Id = val
}

const increaseId = () => {
  return Id++;
}

const disableBtn = () => {
  (<HTMLInputElement> document.getElementById("input")).disabled = true;
  (<HTMLInputElement> document.getElementById("import")).disabled = true;
  canvas.discardActiveObject()
}

export {actionType,setAction,objectSelected,setSelected,weight,setWeight,exists,setExists,getExists,isDirected,setDirected,Id,setId,increaseId,disableBtn}
