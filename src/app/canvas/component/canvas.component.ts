import { Component, OnInit } from "@angular/core";
import {canvas,setCanvas} from '../shared/init-canvas'
import 'fabric';
import Graph from '../shared/graph';
import { actionType } from '../shared/variables';

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

        // 'mouse:enter': this.onMouseOver,

        // 'mouse:leave' : this.onMouseOut,
      });
    }

    onMouseDown = (event) => {
      switch(actionType){
        case 0:
          if(!this.objectSelected){
            Graph.addCircle(event,id++);
          }
          else{
            canvas.discardActiveObject();
          }
          break
        case 1:
          Graph.connectIfTwo()
          break

        case 2:

          break
        }
    }

    onObjectSelected = (event) => {
      if(actionType == 1)
        Graph.selectCircle(event.target.id)
    }

    onObjectMoving = (event) => {
      //TODO
      Graph.updateEdges()
    }

    onSelectionCreated = () => {
      this.objectSelected = true
    }

    onSelectionCleared = () => {
      this.objectSelected = false
    }

    // onMouseOver = (event) => {
    //   event.target.set('fill','green');
    // }

    // onMouseOut = (event) => {

    // }
}


const resetCanvas = () => {
  Graph.selected = []
  id = 0;
}

const CanvasVar = new CanvasComponent();

export default CanvasVar;
export {resetCanvas}
