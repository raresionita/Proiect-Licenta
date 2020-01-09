import 'fabric';

declare const fabric: any;

class EdgeCustom{

    line = null

    //selected 0/1
    s0 = null
    s1 = null

    constructor(s0,s1){
      this.s0 = s0
      this.s1 = s1
      this.line = this.createLine([s0.group.left+15,s0.group.top+15,s1.group.left+15,s1.group.top+15])
    }

    update = () => {
      this.line = this.createLine([this.s0.group.left+15,this.s0.group.top+15,this.s1.group.left+15,this.s1.group.top+15])
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
