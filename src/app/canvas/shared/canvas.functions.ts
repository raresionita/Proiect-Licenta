import {canvas} from './init-canvas'
import Parameter from './parameters';

const setAction = (value) => {
  Parameter.actionType = value
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
    Parameter.objectSelected = null
  }
  canvas.discardActiveObject()
}

const setSelected = (val) => {
  Parameter.objectSelected = val
}

const setWeight = (val) => {
  if(val == null){
    val = ''
    Parameter.weight = val
  }else{
    Parameter.weight = val
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
  Parameter.isDirected = val
}

const setExists = (val) => {
  Parameter.exists = val
}

const getExists = () => {
  return Parameter.exists
}

const setId = (val) => {
  Parameter.Id = val
}

const increaseId = () => {
  return Parameter.Id++;
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

export {setAction,setSelected,setWeight,setExists,getExists,setDirected,setId,increaseId,disableBtn,enableBtn,setComponent,disableId,enableId,setMessage}
