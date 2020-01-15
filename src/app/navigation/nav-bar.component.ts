import { Component } from "@angular/core";
import { canvas, canvasBack } from '../canvas/shared/init-canvas';
import 'fabric';
import { resetCanvas } from '../canvas/component/canvas.component';
import { setAction } from '../canvas/shared/canvas.functions';
import Graph from '../canvas/shared/graph';

var weight = 5
@Component({
    selector: 'nav-bar',
    templateUrl: './nav-bar.component.html'
})


export class NavBarComponent{

  confirmClear() {
    if (confirm('Are you sure?')) {
      canvas.clear();
      canvasBack.clear();
    }
    resetCanvas()
  }

  addVertex(){
    setAction(0)
  }

  connectVertex(){
    setAction(1)
    Graph.connectIfTwo(weight)
  }

  defaultSelected(){
    setAction(2)
    //Graph.updateCircles()
  }

}

export default NavBarComponent
