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

    ngOnInit(){

      setCanvas(new fabric.Canvas('canvas'))

      canvas.on({
        //On circle selected, change color
        'object:selected': this.onObjectSelected,

        'object:moving': this.onObjectMoving,

        'selection:created': this.onSelectionCreated,

        'selection:cleared': this.onSelectionCleared,

        //on mouse click create new circle
        'mouse:down': this.onMouseDown,

        // 'mouse:over': onMouseOver,

        // 'mouse:out' : onMouseOut
      });
    }

    onMouseDown = (event) => {
      if(!this.objectSelected){
        Graph.addCircle(event,id++);
      }
      else{
        canvas.discardActiveObject();
      }
    }

    onObjectSelected = (event) => {
      Graph.selectCircle(event.target.id)
    }

    onObjectMoving = (event) => {
      //TODO
    }

    onSelectionCreated = () => {
      this.objectSelected = true
    }
    
    onSelectionCleared = () => {
      this.objectSelected = false
    }
}


const resetCanvas = () => {
  Graph.selected = []
  id = 0;
}

const CanvasVar = new CanvasComponent();

export default CanvasVar;
export {resetCanvas}
