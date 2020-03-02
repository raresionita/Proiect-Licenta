
import { canvas } from './init-canvas';
import CircleCustom from './circle'
import EdgeCustom from './edge';
import { dialog } from 'src/app/dialog/dialog.functions';
import { weight, isDirected, exists, setExists, setId, setDirected, disableBtn } from './canvas.functions';
import { saveAs } from 'file-saver';
import { Stack } from 'stack-typescript';

class Graph {

  circles = new Map<number, any>()
  selected = []
  edges = []
  adjList = new Map<number, any>()

  addCircle = (left,top,id) => {
    var circleCustom = new CircleCustom(left,top,id)
    this.circles.set(id, circleCustom)

    this.adjList.set(circleCustom.getId(), [])
    canvas.add(circleCustom.group)

    circleCustom.group.lockMovementX = true
    circleCustom.group.lockMovementY = true

  }

  addEdge = () => {
    const start = this.circles.get(this.selected[0])
    const end = this.circles.get(this.selected[1])
    const edge = new EdgeCustom(start, end, weight, isDirected, exists)


    if(exists){
      this.deleteEdge(exists.line)
      setExists(null)
    }

    this.insertAdjacencyList(start, end)
    this.printList(this.adjList)

    this.edges.push(edge)
    canvas.sendToBack(edge.line)
  }

  findPosOfEdge = (edge) => {
    for (var i = 0; i < this.edges.length; i++) {
      if (this.edges[i].line == edge){
        return i
      }
    }
    return -1
  }

  findPosOfVertex = (vertex) => {
    for (var [key, value] of this.circles) {
      if (value.group == vertex){
        return key
      }
    }
    return -1
  }

  deleteEdgeCall = (edgeObject) => {
    var idx = this.findPosOfEdge(edgeObject)
    if (idx > -1) {
      this.edges.splice(idx, 1)
      canvas.remove(edgeObject)
    }
  }

  deleteEdge = (edgeObject) => {
    var idx = this.findPosOfEdge(edgeObject)
    if (idx > -1) {
      const obj = this.edges[idx]
      this.edges.splice(idx, 1)
      this.removeEdgeFromAdjacencyListById(obj)
      canvas.remove(edgeObject)
    }
  }

  deleteVertex = (vertexObject) => {
    var idx = this.findPosOfVertex(vertexObject)
    if (idx > -1) {
      for (var i = 0; i < this.edges.length; i++) {
        if (this.edges[i].start.group == vertexObject || this.edges[i].end.group == vertexObject) {
          this.deleteEdgeCall(this.edges[i].line)
          canvas.remove(this.edges[i])
          i--
        }
      }
      this.circles.delete(idx)
      this.removeVertexFromAdjacencyList(vertexObject)
      this.printList(this.adjList)
      canvas.remove(vertexObject)
    }
  }

  removeObject = (selObject) => {
    if (selObject._objects[0].type === 'line') {
      this.deleteEdge(selObject)
    } else if (selObject._objects[0].type === 'circle') {
      this.deleteVertex(selObject)
    }
  }

  insertAdjacencyList = (start, end) => {
    if (isDirected === "false") {
      this.adjList.get(start.getId()).push(end.getId())
      this.adjList.get(end.getId()).push(start.getId())
    } else {
      this.adjList.get(start.getId()).push(end.getId())
    }
  }

  removeEdgeFromAdjacencyListById = (edge) => {
    const isDirected = edge.isDirected
    const objectRemove = edge.line

    var start = objectRemove.start.group.id;
    var end = objectRemove.end.group.id;

    var listStart:number[] = this.adjList.get(start);
    var listEnd:number[] = this.adjList.get(end);

    listStart = listStart.filter(i => i !== end);
    listEnd = listEnd.filter(i => i !== start);

    for (var i of this.adjList.keys()) {
      if (i === start) {
        this.adjList.set(i, listStart);
      } else if (i === end && (isDirected === "false")) {
          this.adjList.set(i, listEnd);
        }
    }
  }

  removeVertexFromAdjacencyList = (objectRemove) => {
    if (isDirected === "false") {
      for (var [key, value] of this.adjList) {
        if (key == objectRemove.id) {
          this.adjList.delete(key)
          break;
        }
      }
      for (var i of this.adjList.keys()) {
        var values = this.adjList.get(i)
        for (var val of values) {
          if (val == objectRemove.id) {
            values.splice(values.indexOf(val), 1)
            this.adjList.set(i, values)
            break;
          }
        }
      }
    } else {
      for (var [key, value] of this.adjList) {
        if (key == objectRemove.id) {
          this.adjList.delete(key)
          break;
        }
      }
      for (var i of this.adjList.keys()) {
        var values = this.adjList.get(i)
        for (var val of values) {
          if (val == objectRemove.id) {
            values.splice(values.indexOf(val), 1)
            this.adjList.set(i, values)
            break;
          }
        }
      }
    }
  }

  printList = (adjList) => {
    var keys = adjList.keys()
    for (var i of keys) {
      var values = adjList.get(i)
      var conc = ""
      for (var j of values) {
        conc += j + " "
      }
      console.log(i + ": [ " + conc + "]")
    }
    console.log("----------------------")
  }

  selectCircle = (id) => {
    if (this.selected.length < 2) {
      const obj = this.circles.get(id)
      if (!this.selected.includes(id)) {
        obj.colorSelected();
        this.selected.push(id)
        this.connect()
      }
    }
  }

  checkIfLineExist = (a,b) => {
    for(var i = 0;i<this.edges.length;i++){
      const e = this.edges[i]
      if((e.start.getId() == a && e.end.getId() == b) || (e.start.getId() == b && e.end.getId() == a))
        return e
    }
    return null
  }

  connect = () => {
    if (this.selected.length == 2) {
      setExists(this.checkIfLineExist(this.selected[0],this.selected[1]))
      dialog.openDialog().then(() => {
        this.addEdge()
        this.selected = []
        this.updateCirclesColorDefault()
      }).catch((err) => {
        console.log(err)
      })
    }
    canvas.discardActiveObject()
  }

  exportToFile = () => {
    const nrNodes = this.circles.size
    const nrEdges = this.edges.length
    var edgeData,circleData;
    var data = nrNodes + '\n' + nrEdges + '\n'

    for(var [key,value] of this.circles){
      var c = this.circles.get(key).group
      circleData = c.left + ' ' + c.top + ' ' + c.id + '\n';
      data += circleData
    }

    for(var i=0;i<this.edges.length;i++){
      var e = this.edges[i].line
      var ewd = this.edges[i]
      edgeData = e.start.getId() + ' ' + e.end.getId() + ' ' + ewd.weight + ' ' + ewd.isDirected +'\n';
      data += edgeData;
    }

    const blob = new Blob([data], {type: 'application/octet-stream'});
    saveAs(blob,"canvas.txt")

  }

  resetCanvas = () => {
    this.selected = []
    this.edges = []
    this.adjList.clear()
    setId(0)
  }


  importFromFile = () => {
    var file = (<HTMLInputElement>document.getElementById('input')).files[0];
    if(file){
      var reader = new FileReader();
      reader.readAsText(file,"UTF-8")
      reader.onload = (e) => {
        var lines = (reader.result as string).split('\n');
        var circlesLength:any = lines[0]
        var linesLength:any = lines[1]

        for(var i=2;i<lines.length-1-linesLength;i++){
          var left = lines[i].split(" ")[0]
          var top = lines[i].split(" ")[1]
          var id = parseInt(lines[i].split(" ")[2])

          var circleCustom = new CircleCustom(left,top,id)
          circleCustom.setLeft(parseFloat(left))
          circleCustom.setTop(parseFloat(top))

          this.circles.set(id,circleCustom)
          this.adjList.set(circleCustom.getId(), [])
          this.printList(this.adjList)

          canvas.add(circleCustom.group)

          circleCustom.group.lockMovementX = true
          circleCustom.group.lockMovementY = true
        }

        var smecherie = 0
        if(circlesLength == linesLength){
          smecherie = lines.length-circlesLength-1
        } else if(circlesLength > linesLength){
          smecherie = lines.length-circlesLength
        }

        setId(this.getLastId())

        for(var i=smecherie;i<lines.length-1;i++){
          var startId = parseInt(lines[i].split(" ")[0])
          var endId = parseInt(lines[i].split(" ")[1])
          var weight = lines[i].split(" ")[2]
          var isDirect = lines[i].split(" ")[3]

          const start = this.circles.get(startId)
          const end = this.circles.get(endId)
          const edgeCustom = new EdgeCustom(start,end,weight,isDirect,exists)
          setDirected(isDirect)

          this.insertAdjacencyList(start, end)
          this.printList(this.adjList)

          this.edges.push(edgeCustom)
          canvas.sendToBack(edgeCustom.line)
        }
      }
    }
    disableBtn()
    canvas.discardActiveObject()
  }

  getLastId = () => {
    var max = 0
    for(var [key,value] of this.circles)
    {
      if(key > max){
        max = key
      }
    }
    return max+1
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

  //Algorithms

  isCyclicUtil = (v,visited:boolean[],parent) => {
    visited[v] = true
    this.adjList.get(v).forEach(i => {
      console.log(v + ": " + i)
      if(!visited[i]){
        if(this.isCyclicUtil(i,visited,v)){
          return true
        }
      }else if( i != parent){
        return true
      }
    });
    return false
  }

  isCyclic = () => {
    var visited:any[] = [this.circles.size]

    for(var i=0;i<this.circles.size;i++){
      visited[i] = false;
    }

    for(var u=0;u<this.circles.size;u++){
      if(!visited[u]){
        if(this.isCyclicUtil(u,visited,-1)){
          return true
        }
      }
    }

    return false
  }

  topologicalSortUtil = (v:number,visited:boolean[],stack:any) =>{
    visited[v] = true

    this.adjList.get(v).forEach(i => {
      if(!visited[i]){
        this.topologicalSortUtil(i,visited,stack)
      }
    });
    stack.push(v)
  }

  topologicalSort = () => {
    var stack:Stack<number> = new Stack()
    var visited:any = [this.circles.size]

    for(var i=0;i<this.circles.size;i++){
      visited[i] = false
    }

    for(var i=0;i<this.circles.size;i++){
      if(visited[i] == false){
        this.topologicalSortUtil(i,visited,stack)
      }
    }
     
    while(stack.top !== null || stack.length !== 0){
      console.log(stack.pop())
    }
  }

}



const GraphVar = new Graph()
export default GraphVar
