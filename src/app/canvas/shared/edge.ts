import 'fabric';

declare const fabric: any;

class EdgeCustom{

    line = null
    s0 = null
    s1 = null

    constructor(s0,s1){
      this.s0 = s0
      this.s1 = s1
      this.line = this.createLine([s0.group.left,s0.group.top,s1.group.left,s1.group.top])
    }

    update = () => {
      this.line = this.createLine([this.s0.group.left,this.s0.group.top,this.s1.group.left,this.s1.group.top])
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
