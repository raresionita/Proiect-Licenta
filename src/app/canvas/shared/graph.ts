
import { canvas } from './init-canvas';
import CircleCustom from './circle'
import EdgeCustom from './edge';
import { dialog } from 'src/app/dialog/dialog.functions';
import { weight, isDirected, exists, setExists } from './canvas.functions';
import { saveAs } from 'file-saver';

class Graph {

  circles = new Map<number, any>()
  selected = []
  edges = []
  adjList = new Map<number, any>()


  addCircle = (event, id) => {
    var circleCustom = new CircleCustom(event, id)
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
    console.log(this.edges)
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
    if (!isDirected) {
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
      } else if (i === end && (!isDirected)) {
          this.adjList.set(i, listEnd);
        }
    }
  }

  removeVertexFromAdjacencyList = (objectRemove) => {
    if (!isDirected) {
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
      edgeData = 'start:' + e.start.getId() + ' end:' + e.end.getId() + ' weight:' + ewd.weight + ' isDirected:' + ewd.isDirected +'\n';
      data += edgeData;
    }

    const blob = new Blob([data], {type: 'application/octet-stream'});
    saveAs(blob,"canvas.txt")
    
  }
  
  

  importFromFile = () => {
    var file = (<HTMLInputElement>document.getElementById('input')).files[0];
    if(file){
      var reader = new FileReader();
      reader.readAsText(file,"UTF-8")
      reader.onload = (e) => {
        var lines = (reader.result as string).split('\n');
        var circlesLength = lines[0]
        var linesLength:any = lines[1]
        
        for(var i=2;i<lines.length-1-linesLength;i++){
          var left = lines[i].split(" ")[0]
          var top = lines[i].split(" ")[1]
          var id = lines[i].split(" ")[2]
          console.log("left: "+left+" top: " + top + " id: "+id +'\n')
        }
      }
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
