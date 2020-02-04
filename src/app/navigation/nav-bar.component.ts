import { Component } from "@angular/core";
import { clearCanvas } from '../canvas/shared/init-canvas';
import 'fabric';
import { resetCanvas } from '../canvas/component/canvas.component';
import { setAction } from '../canvas/shared/canvas.functions';
import { MatDialog } from '@angular/material';
import { Dialog, setDialog } from '../dialog/dialog.functions';
import GraphVar from '../canvas/shared/graph';


@Component({
    selector: 'nav-bar',
    templateUrl: './nav-bar.component.html'
})


export class NavBarComponent{

  constructor(public dialog: MatDialog){
    setDialog(new Dialog(dialog))
  }

  confirmClear() {
    clearCanvas()
    resetCanvas()
  }

  addVertex(){
    setAction(0)
    GraphVar.resetGraphColorSelected()
  }

  connectVertex(){
    setAction(1)
  }

  defaultSelected(){
    setAction(2)
    GraphVar.resetGraphColorSelected()
  }

  removeObject(){
    setAction(3)
  }
}

export default NavBarComponent
