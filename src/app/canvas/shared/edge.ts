import 'fabric';

declare const fabric: any;

class EdgeCustom{

    line = null
    start = null
    end = null

    weight = null

    constructor(s0,s1,weight){
      this.start = s0
      this.end = s1
      this.weight = weight
      this.line = this.createLine([s0.group.left+15,s0.group.top+15,s1.group.left+15,s1.group.top+15])
    }

    update = () => {
      this.line = this.createLine([this.start.group.left+15,this.start.group.top+15,this.end.group.left+15,this.end.group.top+15])
    }

    createLine = (cds) => {
      const edge = new fabric.Line(cds , {
        fill: 'blue',
        stroke: 'blue',
        strokeWidth: 3,
        selectable: false
      });
      const text = new fabric.Text(this.weight.toString(),{
        fontSize: 30,
        fontWeight: 'bold',
        originX: 'center',
        originY: 'center',
        left:(edge.x1 + edge.x2 )/ 2 - 8,
        top:(edge.y1 + edge.y2 )/ 2 - 15,
        strokeWidth: 1,
        fill: '#000',
        stroke: 'white'
      });
      const group = new fabric.Group([edge,text],{
        hasControls: false,
        hasBorders: false,
      })
      return group
    }
}

export default EdgeCustom
