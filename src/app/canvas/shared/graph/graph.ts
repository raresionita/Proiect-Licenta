import { canvas } from './init-canvas';
import CircleCustom from './circle'
import EdgeCustom from './edge';
import { dialog } from 'src/app/dialog/dialog.functions';
import { setExists, setId, setDirected, disableBtn, setSelectDirected, setSelectUndirected, setComponent, setBidirected, enableDialog } from '../canvas.functions';
import { saveAs } from 'file-saver';
import Parameter from '../parameters';
import { TopologicalSort } from '../strategy/topologicalSort';
import Context from '../strategy/context';
import { DetectCycleUndirected } from '../strategy/detectCycleUndirected';
import { DetectCycleDirected } from '../strategy/detectCycleDirected';
import { StronglyConnected } from '../strategy/stronglyConnected';

class Graph {

  topologicSort:Context = new Context(new TopologicalSort())
  detectCycleUndirected:Context = new Context(new DetectCycleUndirected())
  detectCycleDirected:Context = new Context(new DetectCycleDirected())
  strongly:Context = new Context(new StronglyConnected())

  addCircle = (left,top,id) => {
    var circleCustom = new CircleCustom(left,top,id)
    Parameter.circles.set(id, circleCustom)

    Parameter.adjList.set(circleCustom.getId(), [])
    canvas.add(circleCustom.group)

    circleCustom.group.lockMovementX = true
    circleCustom.group.lockMovementY = true

  }

  addEdge = () => {
    const start = Parameter.circles.get(Parameter.selected[0])
    const end = Parameter.circles.get(Parameter.selected[1])
    const edge = new EdgeCustom(start, end, Parameter.weight, Parameter.isDirected, Parameter.isBidirected, Parameter.exists)

    if(Parameter.exists){
      this.deleteEdge(Parameter.exists.line)
      setExists(null)
    }

    this.insertAdjacencyList(start, end)
    this.printList(Parameter.adjList)

    Parameter.edges.push(edge)
    canvas.sendToBack(edge.line)
  }

  findPosOfEdge = (edge) => {
    for (var i = 0; i < Parameter.edges.length; i++) {
      if (Parameter.edges[i].line == edge){
        return i
      }
    }
    return -1
  }

  findPosOfVertex = (vertex) => {
    for (var [key, value] of Parameter.circles) {
      if (value.group == vertex){
        return key
      }
    }
    return -1
  }

  deleteEdgeCall = (edgeObject) => {
    var idx = this.findPosOfEdge(edgeObject)
    if (idx > -1) {
      Parameter.edges.splice(idx, 1)
      canvas.remove(edgeObject)
    }
  }

  deleteEdge = (edgeObject) => {
    var idx = this.findPosOfEdge(edgeObject)
    if (idx > -1) {
      const obj = Parameter.edges[idx]
      Parameter.edges.splice(idx, 1)
      this.removeEdgeFromAdjacencyListById(obj)
      this.printList(Parameter.adjList)
      canvas.remove(edgeObject)
    }


  }

  deleteVertex = (vertexObject) => {
    var idx = this.findPosOfVertex(vertexObject)
    if (idx > -1) {
      for (var i = 0; i < Parameter.edges.length; i++) {
        if (Parameter.edges[i].start.group == vertexObject || Parameter.edges[i].end.group == vertexObject) {
          this.deleteEdgeCall(Parameter.edges[i].line)
          canvas.remove(Parameter.edges[i])
          i--
        }
      }
      Parameter.circles.delete(idx)
      this.removeVertexFromAdjacencyList(vertexObject)
      this.printList(Parameter.adjList)
      canvas.remove(vertexObject)
    }
  }

  removeObject = (selObject) => {
    if (selObject._objects[0].type === 'line') {
      this.deleteEdge(selObject)
      if(Parameter.edges.length === 0){
        enableDialog();
      }
    } else if (selObject._objects[0].type === 'circle') {
      this.deleteVertex(selObject)
      if(Parameter.edges.length === 0){
        enableDialog();
      }
    }else{
      this.deleteEdge(selObject)
      if(Parameter.edges.length === 0){
        enableDialog();
      }
    }
  }

  insertAdjacencyList = (start, end) => {
    if (Parameter.isDirected === "false" || Parameter.isBidirected === "true") {
      Parameter.adjList.get(start.getId()).push(end.getId())
      Parameter.adjList.get(end.getId()).push(start.getId())
    }else {
      Parameter.adjList.get(start.getId()).push(end.getId())
    }
  }

  removeEdgeFromAdjacencyListById = (edge) => {
    const isDirected = edge.isDirected
    const objectRemove = edge.line

    var start = objectRemove.start.group.id;
    var end = objectRemove.end.group.id;

    var listStart:number[] = Parameter.adjList.get(start);
    var listEnd:number[] = Parameter.adjList.get(end);

    listStart = listStart.filter(i => i !== end);
    listEnd = listEnd.filter(i => i !== start);

    for (var i of Parameter.adjList.keys()) {
      if (i === start) {
        Parameter.adjList.set(i, listStart);
      } else if (i === end && (isDirected === "false")) {
        Parameter.adjList.set(i, listEnd);
      }
    }
  }

  removeVertexFromAdjacencyList = (objectRemove) => {
    if (Parameter.isDirected === "false") {
      for (var [key, value] of Parameter.adjList) {
        if (key == objectRemove.id) {
          Parameter.adjList.delete(key)
          break;
        }
      }
      for (var i of Parameter.adjList.keys()) {
        var values = Parameter.adjList.get(i)
        for (var val of values) {
          if (val == objectRemove.id) {
            values.splice(values.indexOf(val), 1)
            Parameter.adjList.set(i, values)
            break;
          }
        }
      }
    } else {
      for (var [key, value] of Parameter.adjList) {
        if (key == objectRemove.id) {
          Parameter.adjList.delete(key)
          break;
        }
      }
      for (var i of Parameter.adjList.keys()) {
        var values = Parameter.adjList.get(i)
        for (var val of values) {
          if (val == objectRemove.id) {
            values.splice(values.indexOf(val), 1)
            Parameter.adjList.set(i, values)
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
    if (Parameter.selected.length < 2) {
      const obj = Parameter.circles.get(id)
      if (!Parameter.selected.includes(id)) {
        obj.colorSelected();
        Parameter.selected.push(id)
        this.connect()
      }
    }
  }

  checkIfLineExist = (a,b) => {
    for(var i = 0;i<Parameter.edges.length;i++){
      const e = Parameter.edges[i]
      if((e.start.getId() == a && e.end.getId() == b) || (e.start.getId() == b && e.end.getId() == a))
        return e
    }
    return null
  }

  connect = () => {
    if (Parameter.selected.length == 2) {
      setExists(this.checkIfLineExist(Parameter.selected[0],Parameter.selected[1]))
      dialog.openDialog().then(() => {
        this.addEdge()
        Parameter.selected = []
        this.updateCirclesColorDefault()
      }).catch((err) => {
        console.log(err)
      })
    }
    canvas.discardActiveObject()
  }

  exportToFile = () => {
    const nrNodes = Parameter.circles.size
    const nrEdges = Parameter.edges.length
    var edgeData,circleData;
    var data = nrNodes + '\n' + nrEdges + '\n'

    for(var [key,value] of Parameter.circles){
      var c = Parameter.circles.get(key).group
      circleData = c.left + ' ' + c.top + ' ' + c.id + '\n';
      data += circleData
    }

    for(var i=0;i<Parameter.edges.length;i++){
      var e = Parameter.edges[i].line
      var ewd = Parameter.edges[i]
      edgeData = e.start.getId() + ' ' + e.end.getId() + ' ' + ewd.weight + ' ' + ewd.isDirected + ' ' + ewd.isBidirected +'\n';
      data += edgeData;
    }

    const blob = new Blob([data], {type: 'application/octet-stream'});
    saveAs(blob,"canvas.txt")

  }

  resetCanvas = () => {
    Parameter.circles.clear()
    Parameter.selected = []
    Parameter.edges = []
    Parameter.adjList.clear()
    Parameter.selectDirected = null
    Parameter.selectUndirected = null
    setId(0)
    canvas.clear()
  }


  importFromFile = () => {
    this.resetCanvas()
    var file = (<HTMLInputElement>document.getElementById('input')).files[0];
    if(file){
      var reader = new FileReader();
      reader.readAsText(file,"UTF-8")
      reader.onload = () => {
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

          Parameter.circles.set(id,circleCustom)
          Parameter.adjList.set(circleCustom.getId(), [])
          this.printList(Parameter.adjList)

          canvas.add(circleCustom.group)

          circleCustom.group.lockMovementX = true
          circleCustom.group.lockMovementY = true
        }

        var startReadLine = 0
        if(+circlesLength == +linesLength){
          startReadLine = lines.length-circlesLength-1
        } else if(+circlesLength > +linesLength){
          startReadLine = lines.length-linesLength-1
        }else if(+circlesLength < +linesLength){
          startReadLine = lines.length-linesLength-1
        }

        setId(this.getLastId())

        for(var i=startReadLine;i<lines.length-1;i++){
          var startId = parseInt(lines[i].split(" ")[0])
          var endId = parseInt(lines[i].split(" ")[1])
          var weight = lines[i].split(" ")[2]
          var isDirect = lines[i].split(" ")[3]
          var isBidirect = lines[i].split(" ")[4]

          const start = Parameter.circles.get(startId)
          const end = Parameter.circles.get(endId)
          const edgeCustom = new EdgeCustom(start,end,weight,isDirect,isBidirect,Parameter.exists)
          setDirected(isDirect)
          setBidirected(isBidirect)

          if(Parameter.isDirected == "true" || Parameter.isBidirected == "true"){
            setSelectUndirected("false")
            disableBtn("undirectedBtn")
          }else{
            setSelectDirected("false")
            disableBtn("directedBtn")
            disableBtn("topologicBtn")
            disableBtn("stronglyBtn")
          }

          this.insertAdjacencyList(start, end)
          this.printList(Parameter.adjList)

          Parameter.edges.push(edgeCustom)
          canvas.sendToBack(edgeCustom.line)
        }
      }
    }
    disableBtn("import")
    canvas.discardActiveObject()
  }

  getLastId = () => {
    var max = 0
    for(var [key,value] of Parameter.circles)
    {
      if(key > max){
        max = key
      }
    }
    return max+1
  }

  updateEdges = () => {
    Parameter.edges.forEach(edge => {
      canvas.remove(edge.line)
      edge.update()
      canvas.sendToBack(edge.line)
    });
  }

  updateCirclesColorDefault = () => {
    Parameter.circles.forEach(circle => {
      circle.updateColor()
    })
    canvas.renderAll()
  }

  resetGraphColorSelected = () => {
    Parameter.selected = []
    this.updateCirclesColorDefault()
  }

  vals = [];
  fillOrder(v: number, visited: boolean[]) {
    visited[v] = true;
    console.log(v + " ")
    setComponent("message",this.vals,"Strongly connected: ",false)
    if(!this.vals.includes(v)){
      this.vals.push(v);
      Parameter.adjList.get(v).forEach(i => {
        if(!visited[i]){
          this.fillOrder(i,visited);
        }else{
          console.log("\n")
          setComponent("message",this.vals,"Strongly connected: ",true)
        }
      });
    }
    setComponent("message",this.vals,"Strongly connected: ",false) //afiseaza ce a ramas
  }
}

const GraphVar = new Graph()
export default GraphVar
