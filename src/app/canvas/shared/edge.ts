import 'fabric';

declare const fabric: any;

class EdgeCustom{
    line = null
  
    constructor(event,cds){
      this.createLine(event,cds)
    }
  
    createLine = (event,cds) => {
      this.line = new fabric.Line(cds, {
        fill: 'blue',
        stroke: 'blue',
        strokeWidth: 3,
        selectable: false,
        event: false
      })
    }
}

export default EdgeCustom