import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import {canvas,setCanvas} from '../shared/graph/init-canvas'
import 'fabric';
import { setSelected,increaseId } from '../shared/canvas.functions';
//import Graph from '../shared/graph/graph';
import Parameter from '../shared/parameters';
import { Graph } from '../shared/graph/graph';

declare const fabric: any;

@Component({
    selector:'app-canvas',
    templateUrl: './canvas.component.html',
    styleUrls: ['../style/canvas.component.css']
})


export class CanvasComponent implements OnInit{
    Graph = new Graph()
    @ViewChild('container',{static:true}) containerRef: ElementRef;

    ngOnInit(){

      setCanvas(new fabric.Canvas('canvas'))

      canvas.on({
        'object:selected': this.onObjectSelected,
        'object:moving': this.onObjectMoving,
        'mouse:down': this.onMouseDown,
        'mouse:wheel':this.onMouseWheel
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

    onMouseWheel = (event) => {
      var delta = event.e.deltaY;
      var zoom = canvas.getZoom();
      zoom *= 0.999 ** delta;
      if (zoom > 20) zoom = 20;
      if (zoom < 0.01) zoom = 0.01;
      canvas.zoomToPoint({ x: event.e.offsetX, y: event.e.offsetY }, zoom);
      event.e.preventDefault();
      event.e.stopPropagation();
    }

    onMouseDown = (event) => {
      switch(Parameter.actionType){
        case 0:
          (!Parameter.objectSelected) ? this.Graph.addCircle(event.pointer.x-15,event.pointer.y-15,increaseId()) : canvas.discardActiveObject()
          break
        case 1:
          (!Parameter.objectSelected) ? this.Graph.connect() : canvas.discardActiveObject();
          break
        case 3:
          (!Parameter.objectSelected) ? this.Graph.removeObject(event.target) : canvas.discardActiveObject()
          break
        }
    }

    onObjectSelected = (event) => {
      if(Parameter.actionType != 0 && Parameter.actionType != 3){
        setSelected(event.target)
      }
      if(Parameter.actionType == 1){
        this.Graph.selectCircle(event.target.id)
      }
      if(Parameter.actionType == 3){
        this.Graph.removeObject(event.target)
      }
    }

    onObjectMoving = () => {
        this.Graph.updateEdges()
    }
}

