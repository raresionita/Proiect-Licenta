import { MatDialog } from '@angular/material';
import { DialogOverview } from './dialog.component';
import { setWeight, weight } from '../canvas/shared/canvas.functions';

class Dialog{
  constructor(public dialog:MatDialog){}

  openDialog = () => {
    const dialogRef = this.dialog.open(DialogOverview, {
        width: '250px',
        height: '250px',
        data: { weight: weight}
    });


    return new Promise((resolve, reject)=>{
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        setWeight(result)
        resolve()
      });
    })
  }
}

var dialog = null
const setDialog = (d) => {
  dialog = d
}

export {Dialog,dialog,setDialog}
