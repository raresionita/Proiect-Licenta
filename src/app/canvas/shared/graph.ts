
import { canvas,canvasBack } from './init-canvas';
import CircleCustom from './circle'
import EdgeCustom from './edge';
import { dialog } from 'src/app/dialog/dialog.functions';
import { weight,isDirected } from './canvas.functions';

class Graph {

  circles = new Map<number,CircleCustom>()
  selected = []
  edges = []
  adjList = new Map<number,any>()


  addCircle = (event,id) => {
    var circleCustom = new CircleCustom(event,id)
    this.circles.set(id,circleCustom)
    this.adjList.set(circleCustom.getId(),[])
    canvas.add(circleCustom.group)
    circleCustom.group.lockMovementX = true
    circleCustom.group.lockMovementY = true
  }

  addEdge = () => {
    const start = this.circles.get(this.selected[0])
    const end = this.circles.get(this.selected[1])
    const edge = new EdgeCustom(start,end,weight,isDirected)
    if(!isDirected){
      this.adjList.get(start.getId()).push(end.getId())
      this.adjList.get(end.getId()).push(start.getId())
    }else{
      this.adjList.get(start.getId()).push(end.getId())
    }
    this.edges.push(edge)
    this.printList(this.adjList)
    canvasBack.add(edge.line)
  }

  printList = (adjList) => {
    var keys = adjList.keys()
    for(var i of keys){
      var values = adjList.get(i)
      var conc = ""
      for(var j of values){
        conc += j + " "
      }
      console.log(i+ ": [ " + conc + "]")
    }
    console.log("----------------------")
  }

  selectCircle = (id) => {
    if(this.selected.length < 2){
      const obj = this.circles.get(id)
      if(!this.selected.includes(id)){
        obj.colorSelected();
        this.selected.push(id)
        this.connect()
      }
    }
  }

  connect = () => {
    if (this.selected.length == 2) {
      dialog.openDialog().then(()=>{
        this.addEdge()
        this.selected = []
        this.updateCirclesColorDefault()
      }).catch((err)=>{
        console.log(err)
      })
    }
  }

  updateEdges = () => {
    this.edges.forEach(edge => {
      //if line contains circle
      canvasBack.remove(edge.line)
      edge.update()
      canvasBack.add(edge.line)
    });
  }

  updateCirclesColorDefault = () => {
    this.circles.forEach(circle => {
      circle.updateColor()
    })
    canvas.renderAll()
  }

  resetGraphColorSelected = () => {
    this.selected = []
    this.updateCirclesColorDefault()
  }
}

const GraphVar = new Graph()
export default GraphVar
