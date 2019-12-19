import 'fabric';

declare const fabric: any;

class EdgeCustom{
    line = null
  
    constructor(id1,id2){
      this.createLine(id1,id2)
    }
  
    createLine = (id1,id2) => {
      this.line = new fabric.Line(id1,id2, {
        fill: 'blue',
        stroke: 'blue',
        strokeWidth: 3,
        selectable: false,
        event: false
      })
    }
}

export default EdgeCustom