import 'fabric';
declare const fabric: any;

export function makeCircle(left:any, top:any, line1:any, line2:any, line3:any, line4:any){
    var c = new fabric.Circle({
      left: left,
      top: top,
      strokeWidth: 5,
      radius: 12,
      fill: '#fff',
      stroke: '#666'
    });

    c.hasControls = c.hasBorders = false;

    c.line1 = line1;
    c.line2 = line2;
    c.line3 = line3;
    c.line4 = line4;

    return c;
}

export function makeLine(coords){
    return new fabric.Line(coords, {
      fill: 'red',
      stroke: 'red',
      strokeWidth: 5,
      selectable: false,
      evented: false,
    });
}

/*Important*/


