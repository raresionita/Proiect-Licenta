
import { canvas,canvasBack } from './init-canvas';
import CircleCustom from './circle'
import EdgeCustom from './edge';

class Graph {
  circles = new Map<number,CircleCustom>()
  selected = []
  edges = []

  addCircle = (event,id) => {
    var circleCustom = new CircleCustom(event,id)
    this.circles.set(id,circleCustom)
    canvas.add(circleCustom.group)
    circleCustom.group.lockMovementX = true
    circleCustom.group.lockMovementY = true
  }

  addEdge = () => {
    const start = this.circles.get(this.selected[0])
    const end = this.circles.get(this.selected[1])
    const edge = new EdgeCustom(start,end)
    this.edges.push(edge)
    canvasBack.add(edge.line)
  }

  selectCircle = (id) => {
    if(this.selected.length < 2){
      const obj = this.circles.get(id)
      if(!this.selected.includes(id)){
        obj.colorSelected();
        this.selected.push(id)
        this.connectIfTwo()
      }
    }
  }

  connectIfTwo = () => {
    if (this.selected.length == 2) {
      this.addEdge()
      this.updateCirclesColorDefault()
      this.selected = []
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
  }
}

const GraphVar = new Graph()
export default GraphVar
