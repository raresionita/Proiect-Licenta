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

const setComponent = (id,arr) => {
  var txt = document.getElementById(id)
  var str = "Topological Sort: "

  arr.forEach(i => {
    str += i + " "
  });

  txt.innerText = str
}

const setMessage = (msg) => {
  var txt = document.getElementById("message")
  txt.innerText = msg
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

const disableId = (id) => {
  (<HTMLInputElement> document.getElementById(id)).disabled = true;
}

const enableId = (id) => {
  (<HTMLInputElement> document.getElementById(id)).disabled = false;
}

const disableBtn = () => {
  disableId("input")
  disableId("import")
}

const enableBtn = () => {
  enableId("input")
  enableId("import")
}

export {actionType,setAction,objectSelected,setSelected,weight,setWeight,exists,setExists,getExists,isDirected,setDirected,Id,setId,increaseId,disableBtn,enableBtn,setComponent,disableId,enableId,setMessage}
