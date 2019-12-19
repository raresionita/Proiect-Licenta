
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

  selectCircle = (id) => {
    if(this.selected.length < 2){
      const obj = this.circles.get(id)
      if(!this.selected.includes(id)){
        obj.colorSelected();
        this.selected.push(id)
      }
    }
    console.log(this.selected.length)
  }

  addEdge = (id1,id2) =>{
    const edge = new EdgeCustom(id1,id2)
    canvas.add(edge)
  }
}

const GraphVar = new Graph()


export default GraphVar
