
import { canvas } from './init-canvas';
import CircleCustom from './circle'
import EdgeCustom from './edge';

class Graph {
  //Map pentru cercuri pentru a putea sterge din el de oriunde
  circles = new Map<number,CircleCustom>()
  selected = []
  edges = []

  addCircle = (event,id) => {
    var circleCustom = new CircleCustom(event,id)
    this.circles.set(id,circleCustom)
    canvas.add(circleCustom.group)
  }

  connectIfTwo = () => {
    if (this.selected.length == 2) {
      this.addEdge()
    }
  }

  addEdge = () => {
    const s0 = this.circles.get(this.selected[0])
    const s1 = this.circles.get(this.selected[1])
    const edge = new EdgeCustom(s0,s1)
    this.edges.push(edge)
    canvas.add(edge.line)
  }

  updateEdges = () => {
    this.edges.forEach(edge => {
      //if line contains circle
      canvas.remove(edge.line)
      edge.update()
      canvas.add(edge.line)
    });
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
    console.log(this.selected.length)
  }

}

const GraphVar = new Graph()


export default GraphVar
