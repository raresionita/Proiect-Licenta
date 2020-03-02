import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import {canvas,setCanvas} from '../shared/init-canvas'
import 'fabric';
import { actionType,objectSelected,setSelected,increaseId, setId } from '../shared/canvas.functions';
import Graph from '../shared/graph';

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
        //'mouse:wheel': this.onMouseWheel
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
      switch(actionType){
        case 0:
          (!objectSelected) ? Graph.addCircle(event.pointer.x-15,event.pointer.y-15,increaseId()) : canvas.discardActiveObject()
          break
        case 1:
          (!objectSelected) ? Graph.connect() : canvas.discardActiveObject();
          break
        case 3:
          (!objectSelected) ? Graph.removeObject(event.target) : canvas.discardActiveObject()
          break
        }
    }

    onObjectSelected = (event) => {
      if(actionType != 0 && actionType != 3){
        setSelected(event.target)
      }
      if(actionType == 1){
        Graph.selectCircle(event.target.id)
      }
      if(actionType == 3){
        Graph.removeObject(event.target)
      }
    }

    onObjectMoving = () => {
        Graph.updateEdges()
    }

    // onMouseWheel = (opt) => {
    //   var delta = opt.e.deltaY
    //   var pointer = canvas.getPointer(opt.e)
    //   var zoom = canvas.getZoom()
    //   zoom = zoom + delta/200
    //   if(zoom > 10)
    //     zoom = 10
    //   if(zoom < 0.01)
    //     zoom = 0.01

    //   canvas.zoomToPoint({
    //     x: opt.e.offsetX, 
    //     y: opt.e.offsetY
    //   }, zoom);

    //   opt.e.preventDefault();
    //   opt.e.stopPropagation();
    // }
}

