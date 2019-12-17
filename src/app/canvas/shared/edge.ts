import 'fabric';

declare const fabric: any;

class EdgeCustom{
    line = null
  
    constructor(event,cds){
      this.createLine(cds)
    }
  
    createLine = (cds) => {
      this.line = new fabric.Line(cds, {
        fill: 'blue',
        stroke: 'blue',
        strokeWidth: 3,
        selectable: false,
        event: false
      })
    }
}

export {EdgeCustom}