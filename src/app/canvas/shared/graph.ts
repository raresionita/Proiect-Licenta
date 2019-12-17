
import { canvas } from './init-canvas';
import CircleCustom from './circle'

class Graph {
  circles = []
  addCircle = (event,id) => {
    var circleCustom = new CircleCustom(event,id)
    this.circles[id] = circleCustom
    canvas.add(circleCustom.group)
  }
}

const GraphVar = new Graph()


export default GraphVar
