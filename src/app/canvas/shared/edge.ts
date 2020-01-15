import 'fabric';
import { BoundElementProperty } from '@angular/compiler';

declare const fabric: any;

class EdgeCustom{

    line = null
    //selected 0/1
    s0 = null
    s1 = null

    text = null
    edge = null

    weight = 0

    constructor(s0,s1,weight){
      this.s0 = s0
      this.s1 = s1
      this.weight = weight
      this.line = this.createLine([s0.group.left+15,s0.group.top+15,s1.group.left+15,s1.group.top+15])
    }

    update = () => {
      this.line = this.createLine([this.s0.group.left+15,this.s0.group.top+15,this.s1.group.left+15,this.s1.group.top+15])
    }

    createLine = (cds) => {
      this.edge = new fabric.Line(cds , {
        fill: 'blue',
        stroke: 'blue',
        strokeWidth: 3,
        selectable: false
      });
      this.text = new fabric.Text(this.weight.toString(),{
        fontSize: 30,
        fontWeight: 'bold',
        originX: 'center',
        originY: 'center',
        left:(this.edge.x1 + this.edge.x2 )/ 2,
        top:(this.edge.y1 + this.edge.y2 )/ 2 - 15,
        strokeWidth: 1,
        fill: '#000',
        stroke: 'white'
      });
      const group = new fabric.Group([this.edge,this.text],{
        hasControls: false,
        hasBorders: false,
      })
      return group
    }


}

export default EdgeCustom
