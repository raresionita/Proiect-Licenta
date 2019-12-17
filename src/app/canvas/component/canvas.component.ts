import { Component, OnInit } from "@angular/core";
import {canvas,setCanvas} from '../shared/init-canvas'
import { circles, newCircle } from '../shared/circle';

import 'fabric';

declare const fabric: any;

@Component({
    selector:'app-canvas',
    templateUrl: './canvas.component.html',
    styleUrls: ['../style/canvas.component.css']
})


export class CanvasComponent implements OnInit{
    objectSelected = false
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
        if(!this.objectSelected)
          newCircle(event,this.id++);
        else
          canvas.discardActiveObject();
      });
      
      //On circle selected, change color
      canvas.on('object:selected',(event) => {
        console.log(event.target)
        const obj = circles[event.target.id]
         obj.colorSelected();
      });

    }

  }

