import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import {canvas,setCanvas} from '../shared/graph/init-canvas'
import 'fabric';
import { setSelected,increaseId } from '../shared/graph/canvas.functions';
import Graph from '../shared/graph/graph';
import Parameter from '../shared/parameters';

declare const fabric: any;

@Component({
    selector:'app-canvas',
    templateUrl: './canvas.component.html',
    styleUrls: ['../style/canvas.component.css']
})


export class CanvasComponent implements OnInit{
    @ViewChild('container',{static:true}) containerRef: ElementRef;

    ngOnInit(){

      setCanvas(new fabric.Canvas('canvas'))

      canvas.on({
        'object:selected': this.onObjectSelected,
        'object:moving': this.onObjectMoving,
        'mouse:down': this.onMouseDown,
      })

      window.addEventListener('resize', this.onResize,false)
      this.onResize()
    }

    onResize = () => {
      const width = this.containerRef.nativeElement.offsetWidth
      const height = this.containerRef.nativeElement.offsetHeight
      canvas.setWidth(width)
      canvas.setHeight(height)
    }

    onMouseDown = (event) => {
      switch(Parameter.actionType){
        case 0:
          (!Parameter.objectSelected) ? Graph.addCircle(event.pointer.x-15,event.pointer.y-15,increaseId()) : canvas.discardActiveObject()
          break
        case 1:
          (!Parameter.objectSelected) ? Graph.connect() : canvas.discardActiveObject();
          break
        case 3:
          (!Parameter.objectSelected) ? Graph.removeObject(event.target) : canvas.discardActiveObject()
          break
        }
    }

    onObjectSelected = (event) => {
      if(Parameter.actionType != 0 && Parameter.actionType != 3){
        setSelected(event.target)
      }
      if(Parameter.actionType == 1){
        Graph.selectCircle(event.target.id)
      }
      if(Parameter.actionType == 3){
        Graph.removeObject(event.target)
      }
    }

    onObjectMoving = () => {
        Graph.updateEdges()
    }
}

