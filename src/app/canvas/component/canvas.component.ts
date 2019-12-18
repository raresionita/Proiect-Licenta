import { Component, OnInit } from "@angular/core";
import {canvas,setCanvas} from '../shared/init-canvas'

import 'fabric';
import Graph from '../shared/graph';

declare const fabric: any;

@Component({
    selector:'app-canvas',
    templateUrl: './canvas.component.html',
    styleUrls: ['../style/canvas.component.css']
})


export class CanvasComponent implements OnInit{
    objectSelected = false
    nrSelected = 0
    id = 0

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
          Graph.addCircle(event,this.id++);
        }
        else{
          canvas.discardActiveObject();
        }
      });

      //On circle selected, change color
      canvas.on('object:selected',(event) => {

        //console.log(Graph.circles)

        if(!this.objectSelected && this.nrSelected <2){
          const objSelected = Graph.circles.get(event.target.id)
          if(!objSelected.selected){
            objSelected.colorSelected();
            this.nrSelected++;
            console.log(objSelected.group.id)
          }
        }



      });

    }
}
