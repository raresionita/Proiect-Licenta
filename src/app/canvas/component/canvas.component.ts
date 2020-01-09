import { Component, OnInit } from "@angular/core";
import {canvas,setCanvas} from '../shared/init-canvas'
import 'fabric';
import Graph from '../shared/graph';
import { actionType } from '../shared/canvas.functions';
import CircleCustom from '../shared/circle';

declare const fabric: any;
var id = 0

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
        'object:selected': this.onObjectSelected,
        'object:moving': this.onObjectMoving,
        'selection:created': this.onSelectionCreated,
        'selection:cleared': this.onSelectionCleared,
        'mouse:down': this.onMouseDown,
        'mouse:over': this.onMouseOver,
        'mouse:out': this.onMouseOut
      });
    }

    onMouseDown = (event) => {

      switch(actionType){
        case 0:
          (!this.objectSelected) ? Graph.addCircle(event,id++) : canvas.discardActiveObject();
          break
        case 1:
          (!this.objectSelected) ? Graph.connectIfTwo() : canvas.discardActiveObject();
          break
        case 2:
          //ToDo Default
          break
        }
    }

    onMouseOver = (event) => {
    }

    onMouseOut = (event) => {
      console.log("OUT")
    }

    onObjectSelected = (event) => {
      if(actionType == 1)
        Graph.selectCircle(event.target.id)
    }

    onObjectMoving = (event) => {
        Graph.updateEdges()
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
