import { Component } from "@angular/core";
import { canvas, canvasBack } from '../canvas/shared/init-canvas';
import 'fabric';
import { resetCanvas } from '../canvas/component/canvas.component';
import { setAction, weight, setWeight } from '../canvas/shared/canvas.functions';
import Graph from '../canvas/shared/graph';
import { MatDialog } from '@angular/material';
import { DialogOverview } from '../dialog/dialog.component';

@Component({
    selector: 'nav-bar',
    templateUrl: './nav-bar.component.html'
})

export class NavBarComponent{

  constructor(public dialog: MatDialog){}

    openDialog = () => {
        const dialogRef = this.dialog.open(DialogOverview, {
            width: '250px',
            height: '250px',
            data: { weight: weight}
        });
        
        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            setWeight(result)
        });
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
    Graph.connectIfTwo(weight)
    this.openDialog()
  }

  defaultSelected(){
    setAction(2)
  }

}

export default NavBarComponent