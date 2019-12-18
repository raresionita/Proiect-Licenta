
import { canvas } from './init-canvas';
import CircleCustom from './circle'

class Graph {
  //Map pentru cercuri pentru a putea sterge din el de oriunde
  circles = new Map<number,CircleCustom>()
  selected = []
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
    console.log(this.selected)
  }
}

const GraphVar = new Graph()


export default GraphVar
