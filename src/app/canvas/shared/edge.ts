import 'fabric';

declare const fabric: any;

class EdgeCustom{
  
    constructor(cds){
      this.createLine(cds)
    }
  
    createLine = (cds) => {
      return new fabric.Line(cds, {
        fill: 'blue',
        stroke: 'blue',
        strokeWidth: 3,
        selectable: false
      });
    }
}

export default EdgeCustom