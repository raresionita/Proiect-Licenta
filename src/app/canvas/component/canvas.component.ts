import { Component, OnInit } from "@angular/core";
import { drawCircle } from '../shared/canvasFunctions';
import {canvas,setCanvas} from '../shared/init-canvas'
import 'fabric';
declare const fabric: any;

@Component({
    selector:'app-canvas',
    templateUrl: './canvas.component.html',
    styleUrls: ['../style/canvas.component.css']
})


export class CanvasComponent implements OnInit{

    objectSelected = false
    ngOnInit(){
      setCanvas(new fabric.Canvas('canvas'))
     // this.canvas = new fabric.Canvas('canvas');
      //IF NOTHING ON MOUSE DOWN
      //      selection:updated
      //selection:created

      canvas.on('selection:created', () => {
        this.objectSelected = true
      })
      canvas.on('selection:cleared',()=>{
        this.objectSelected = false
      })
      canvas.on('mouse:down', (event:any) => {
        if(!this.objectSelected)
          drawCircle(event);
      });

    }

}








    // ngOnInit(){


    // this.canvas = new fabric.Canvas('canvas', {
    //   hoverCursor: 'pointer',
    //   selection: false,
    //   selectionBorderColor: 'blue'
    // });
    // fabric.Object.prototype.originX = fabric.Object.prototype.originY = 'center';

    //    var line = makeLine([ 250, 125, 250, 175 ]),
    //     line2 = makeLine([ 250, 175, 250, 250 ]),
    //     line3 = makeLine([ 250, 250, 300, 350]),
    //     line4 = makeLine([ 250, 250, 200, 350]),
    //     line5 = makeLine([ 250, 175, 175, 225 ]),
    //     line6 = makeLine([ 250, 175, 325, 225 ]);

    //     this.canvas.add(line,line2,line3,line4,line5,line6);

    //     var circle2 = makeCircle(line.get('x1'), line.get('y1'), null, line, null, null),
    //     circle3 = makeCircle(line.get('x2'), line.get('y2'), line, line2, line5, line6),
    //     circle4 = makeCircle(line2.get('x2'), line2.get('y2'), line2, line3, line4, null),
    //     circle5 = makeCircle(line3.get('x2'), line3.get('y2'), line3, null, null, null),
    //     circle6 = makeCircle(line4.get('x2'), line4.get('y2'), line4, null, null, null),
    //     circle7 = makeCircle(line5.get('x2'), line5.get('y2'), line5, null, null, null),
    //     circle8 = makeCircle(line6.get('x2'), line6.get('y2'), line6, null, null, null)

    //     this.canvas.add(circle2,circle3,circle4,circle5,circle6,circle7,circle8);

    //     this.canvas.on('object:moving', function(e) {
    //       var p = e.target;
    //       p.line1 && p.line1.set({ 'x2': p.left, 'y2': p.top });
    //       p.line2 && p.line2.set({ 'x1': p.left, 'y1': p.top });
    //       p.line3 && p.line3.set({ 'x1': p.left, 'y1': p.top });
    //       p.line4 && p.line4.set({ 'x1': p.left, 'y1': p.top });

    //     });
    //     this.canvas.renderAll();

    // }

