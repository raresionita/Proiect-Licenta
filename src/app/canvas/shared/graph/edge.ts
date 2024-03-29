import 'fabric';

declare const fabric: any;

class EdgeCustom{

    line = null
    start = null
    end = null

    weight?:any
    isDirected:string
    isBidirected:string
    exists:any

    constructor(start,end,weight,isDirected,isBidirected,exists){
      this.start = start
      this.end = end
      this.weight=weight
      this.isDirected = isDirected
      this.isBidirected = isBidirected
      this.exists = exists

      if(this.isDirected == "true"){
        this.line = this.createDirectedLine([start.getLeft()+15,start.getTop()+15,end.getLeft()+15,end.getTop()+15])
      }else if(this.isBidirected == "true"){
        this.line = this.createBidirectedLine([start.getLeft()+15,start.getTop()+15,end.getLeft()+15,end.getTop()+15])
      }else if(this.isDirected == "false" && this.isBidirected == "false"){
        this.line = this.createLine([start.getLeft()+15,start.getTop()+15,end.getLeft()+15,end.getTop()+15])
      }
    }

    update = () => {
      if(this.isDirected == "true"){
        this.line = this.createDirectedLine([this.start.getLeft()+15,this.start.getTop()+15,this.end.getLeft()+15,this.end.getTop()+15])
      }else if(this.isBidirected == "true"){
        this.line = this.createBidirectedLine([this.start.getLeft()+15,this.start.getTop()+15,this.end.getLeft()+15,this.end.getTop()+15])
      }else if(this.isDirected == "false"){
        this.line = this.createLine([this.start.getLeft()+15,this.start.getTop()+15,this.end.getLeft()+15,this.end.getTop()+15])
      }
    }

    createLine = (cds) => {
      const edge = new fabric.Line(cds , {
        fill: 'blue',
        stroke: 'blue',
        strokeWidth: 2.5,
        originX: 'center',
        originY: 'center',
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
        start: this.start,
        end: this.end,
        hasControls: false,
        hasBorders: false,
        selectable: false,
        targetFindTolerance: 2,
      })
      return group
    }

    calcArrowAngle1(x1, y1, x2, y2) {
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

    calcArrowAngle2(x1, y1, x2, y2) {
      var angle = 0, x, y;
      x = -x2 + x1;
      y = -y2 + y1;

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
    const size = 17
    const angle = this.calcArrowAngle1(cds[0],cds[1],cds[2],cds[3])
    const fix = this.fixPosition(angle,20)
    const x = cds[2]
    const y = cds[3]
    cds[2] -= fix.w
    cds[3] += fix.h
    const line = new fabric.Line(cds , {
      fill: 'blue',
      stroke: 'blue',
      strokeWidth: 2.5,
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
      stroke: 'white',
      selectable: false,
    });

    const directedLines = [line,arrow,text];

    const group = new fabric.Group(directedLines,{
      start: this.start,
      end: this.end,
      hasControls: false,
      hasBorders: false,
      selectable: false,
      targetFindTolerance: 2,
    });

    return group;
  }

  createBidirectedLine = (cds) => {
    const size = 17
    const angle = this.calcArrowAngle1(cds[0],cds[1],cds[2],cds[3])
    const angle2 = this.calcArrowAngle2(cds[0],cds[1],cds[2],cds[3])
    const fix = this.fixPosition(angle,20)
    const fix2 = this.fixPosition(angle2,20)
    const a = cds[0]
    const b = cds[1]
    const x = cds[2]
    const y = cds[3]
    cds[0] -= fix2.w
    cds[1] += fix2.h
    cds[2] -= fix.w
    cds[3] += fix.h
    const line = new fabric.Line(cds , {
      fill: 'blue',
      stroke: 'blue',
      strokeWidth: 2.5,
      originX: 'center',
      originY: 'center',
    });

    const arrow1 = new fabric.Triangle({
      width: size,
      height: size,
      fill: 'blue',
      left: a + fix.w,
      top: b - fix.h,
      originX: 'center',
      originY: 'center',
      angle: angle2,
    });

    const arrow2 = new fabric.Triangle({
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
      stroke: 'white',
      selectable: false,
    });

    const bidirectedLines = [arrow1,line,arrow2,text];

    const group = new fabric.Group(bidirectedLines,{
      start: this.start,
      end: this.end,
      hasControls: false,
      hasBorders: false,
      selectable: false,
      targetFindTolerance: 2,
    });

    return group;
  }

  setDirect = (dir) => {
    this.isDirected = dir
  }

  getDirect = () => {
    return this.isDirected
  }
}

export default EdgeCustom
