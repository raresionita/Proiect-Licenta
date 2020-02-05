
import { canvas } from './init-canvas';
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

    this.insertAdjacencyList(start,end)
    this.printList(this.adjList)

    this.edges.push(edge)
    canvas.sendToBack(edge.line)
   // console.log()
  }

  findPosOfEdge = (edge) => {
    for(var i = 0;i<this.edges.length;i++){
      if(this.edges[i].line == edge)
        return i
    }
    return -1
  }

  findPosOfVertex = (vertex) => {
    for(var [key,value] of this.circles){
      if(value.group == vertex)
        return key
    }
    return -1
  }

  removeEdge = (edgeObject) => {
    var idx = this.findPosOfEdge(edgeObject)
    if(idx > -1){
      this.edges.splice(idx,1)
      canvas.remove(edgeObject)
    }
  }

  removeVertex = (vertexObject) => {
    var idx = this.findPosOfVertex(vertexObject)
    if(idx > -1){
      console.log("1")
      for(var i=0;i<this.edges.length;i++){
        console.log("2")
        console.log(this.edges[i])
        console.log(vertexObject)
        if(this.edges[i].start == vertexObject.start || this.edges[i].end == vertexObject.start){
          console.log("3")
          this.removeEdge(this.edges[i])
          canvas.remove(this.edges[i])
          i--
        }
      }
      this.circles.delete(idx)
      canvas.remove(vertexObject)
    }
    
  }

  insertAdjacencyList = (start,end) => {
    if(!isDirected){
      this.adjList.get(start.getId()).push(end.getId())
      this.adjList.get(end.getId()).push(start.getId())
    }else{
      this.adjList.get(start.getId()).push(end.getId())
    }
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
      canvas.remove(edge.line)
      edge.update()
      canvas.sendToBack(edge.line)
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
