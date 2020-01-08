import { Component } from "@angular/core";
import { canvas } from '../canvas/shared/init-canvas';
import 'fabric';
import { resetCanvas } from '../canvas/component/canvas.component';
import { setAction } from '../canvas/shared/canvas.functions';
import Graph from '../canvas/shared/graph';

declare const fabric: any;

@Component({
    selector: 'nav-bar',
    templateUrl: './nav-bar.component.html'
})

export class NavBarComponent{

  confirmClear() {
    if (confirm('Are you sure?')) {
      canvas.clear();
    }
    resetCanvas()
  }

  addVertex(){
    setAction(0)
  }

  connectVertex(){
    setAction(1)
    Graph.connectIfTwo()
  }

  defaultSelected(){
    setAction(2)
  }

}

export default NavBarComponent
