
import { canvas } from './init-canvas';
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
  }

  addEdge = () => {
    const start = this.circles.get(this.selected[0])
    const end = this.circles.get(this.selected[1])
    const edge = new EdgeCustom(start,end)
    this.edges.push(edge)
    canvas.add(edge.line)
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
      this.updateCircles()
      this.selected = []
    }
  }

  updateEdges = () => {
    this.edges.forEach(edge => {
      //if line contains circle
      canvas.remove(edge.line)
      edge.update()
      canvas.add(edge.line)
    });
  }

  updateCircles = () => {
    this.circles.forEach(circle => {
      circle.updateColor()
    })
  }
}

const GraphVar = new Graph()


export default GraphVar
