
import { canvas } from './init-canvas';
import CircleCustom from './circle'

class Graph {
  //Map pentru cercuri pentru a putea sterge din el de oriunde
  circles = new Map<number,CircleCustom>();
  addCircle = (event,id) => {
    var circleCustom = new CircleCustom(event,id)
    //this.circles[id] = circleCustom
    this.circles.set(id,circleCustom)
    canvas.add(circleCustom.group)
  }
}

const GraphVar = new Graph()


export default GraphVar
