import 'fabric';

declare const fabric: any;

class EdgeCustom{

    line = null
    start = null
    end = null

    weight?:any
    isDirected:boolean

    constructor(s0,s1,weight,isDirected){
      this.start = s0
      this.end = s1
      this.weight=weight
      this.isDirected = isDirected

      if(this.isDirected){
        this.line = this.createDirectedLine([s0.group.left+15,s0.group.top+15,s1.group.left+15,s1.group.top+15])
      }else{
        this.line = this.createLine([s0.group.left+15,s0.group.top+15,s1.group.left+15,s1.group.top+15])
      }

    }

    update = () => {
      if(this.isDirected){
        this.line = this.createDirectedLine([this.start.group.left+15,this.start.group.top+15,this.end.group.left+15,this.end.group.top+15])
      }else{
        this.line = this.createLine([this.start.group.left+15,this.start.group.top+15,this.end.group.left+15,this.end.group.top+15])
      }
    }

    createLine = (cds) => {
      const edge = new fabric.Line(cds , {
        fill: 'blue',
        stroke: 'blue',
        strokeWidth: 3,
        selectable: false,
        originX: 'center',
        originY: 'center'
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

    calcArrowAngle(x1, y1, x2, y2) {
      var angle = 0, x, y;
      x = (x2 - x1);
      y = (y2 - y1);

      if (x === 0) {
          angle = (y === 0) ? 0 : (y > 0) ? Math.PI / 2 : Math.PI * 3 / 2;
      } else if (y === 0) {
          angle = (x > 0) ? 0 : Math.PI;
      } else {
          angle = (x < 0) ? Math.atan(y / x) + Math.PI : (y < 0) ? Math.atan(y / x) + (2 * Math.PI) : Math.atan(y / x);
      }
      return (angle * 180 / Math.PI + 90)%360;
  }

  radian = (radians) => {
    return radians * (Math.PI/180);
  }

  fixPosition = (angle,size) => {
    const x=Math.sin(this.radian(angle))
    const y=Math.cos(this.radian(angle))
    size += 3
    return {
      w : size*x,
      h : size*y
    }
  }

    createDirectedLine = (cds) => {
      const size = 20
      const angle = this.calcArrowAngle(cds[0],cds[1],cds[2],cds[3])
      const fix = this.fixPosition(angle,20)
      const x = cds[2]
      const y = cds[3]
      cds[2] -= fix.w
      cds[3] += fix.h
      const line = new fabric.Line(cds , {
        fill: 'blue',
        stroke: 'blue',
        strokeWidth: 3,
        selectable: false,
        originX: 'center',
        originY: 'center',
      });

      const arrow = new fabric.Triangle({
        width: size,
        height: size,
        fill: 'blue',
        left: x - fix.w,
        top: y + fix.h,
        originX: 'center',
        originY: 'center',
        angle: angle,
      });

      const text = new fabric.Text(this.weight.toString(),{
        fontSize: 30,
        fontWeight: 'bold',
        originX: 'center',
        originY: 'center',
        left:(line.x1 + line.x2 )/ 2 - 8,
        top:(line.y1 + line.y2 )/ 2 - 15,
        strokeWidth: 1,
        fill: '#000',
        stroke: 'white'
      });

      const directedLines = [line,arrow,text];

      const group = new fabric.Group(directedLines,{
        hasControls: false,
        hasBorders: false
      });

      return group;

    }
}

export default EdgeCustom
