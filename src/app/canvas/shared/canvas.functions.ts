import {canvas} from './init-canvas'
import Parameter from './parameters';
import GraphVar from './graph';

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

const setComponent = (id,arr,alg:string) => {
  var txt = document.getElementById(id)
  var str = alg;

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

const setSelectDirected = (val) => {
  Parameter.selectDirected = val
}

const getSelectDirected= () => {
  return Parameter.selectDirected
}

const setSelectUndirected = (val) => {
  Parameter.selectUndirected = val
}

const getSelectUndirected= () => {
  return Parameter.selectUndirected
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

const disableBtn = (str:string) => {
  switch(str){
    case "import":
      disableId("input")
      disableId("import")
      break;
    case "directedBtn":
      disableId("directedBtn")
      break;
    case "undirectedBtn":
      disableId("undirectedBtn")
      break;
    case "topologicBtn":
      disableId("topologicBtn")
      break;
    case "stronglyBtn":
      disableId("stronglyBtn")
      break;
    case "shortestBtn":
      disableId("shortestBtn")
      break
    default:
      console.log("No match")
  }
}

const enableBtn = () => {
  enableId("input")
  enableId("import")
  enableId("directedBtn")
  enableId("undirectedBtn")
  enableId("topologicBtn")
  enableId("stronglyBtn")
  enableId("shortestBtn")

}

export {setAction,setSelected,setWeight,setExists,getExists,setDirected,setId,increaseId,disableBtn,enableBtn,setComponent,disableId,enableId,setMessage,setSelectDirected,getSelectDirected,setSelectUndirected,getSelectUndirected}
