import { Component, OnInit } from "@angular/core";
import {canvas,setCanvas} from '../shared/init-canvas'

import 'fabric';
import Graph from '../shared/graph';

declare const fabric: any;
var id = 0;

@Component({
    selector:'app-canvas',
    templateUrl: './canvas.component.html',
    styleUrls: ['../style/canvas.component.css']
})


export class CanvasComponent implements OnInit{
    objectSelected = false
    nrSelected = 0

    ngOnInit(){
      setCanvas(new fabric.Canvas('canvas'))

      canvas.on('selection:created', () => {
        this.objectSelected = true
      })
      canvas.on('selection:cleared',()=>{
        this.objectSelected = false
      })

      //on mouse click create new circle
      canvas.on('mouse:down', (event:any) => {
        if(!this.objectSelected){
          Graph.addCircle(event,id++);
        }
        else{
          canvas.discardActiveObject();
        }
      });

      //On circle selected, change color
      canvas.on('object:selected',(event) => {
        Graph.selectCircle(event.target.id)

      });

    }
}

const resetCanvas = () => {
  Graph.selected = []
  id = 0;
}

export default CanvasComponent;
export {resetCanvas}
