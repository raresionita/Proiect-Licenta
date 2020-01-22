import { Component } from "@angular/core";
import { canvas, canvasBack } from '../canvas/shared/init-canvas';
import 'fabric';
import { resetCanvas } from '../canvas/component/canvas.component';
import { setAction } from '../canvas/shared/canvas.functions';
import { MatDialog } from '@angular/material';
import { Dialog, setDialog } from '../dialog/dialog.functions';


@Component({
    selector: 'nav-bar',
    templateUrl: './nav-bar.component.html'
})


export class NavBarComponent{

  constructor(public dialog: MatDialog){
    setDialog(new Dialog(dialog))
  }

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
  }

  defaultSelected(){
    setAction(2)
  }

}

export default NavBarComponent
