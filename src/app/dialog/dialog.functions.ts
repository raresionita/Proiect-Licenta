import { MatDialog } from '@angular/material';
import { DialogOverview } from './dialog.component';
import { setWeight, weight, getExists} from '../canvas/shared/canvas.functions';

class Dialog{

  constructor(public dialog:MatDialog){}

  openDialog = () => {
    const dialogRef = this.dialog.open(DialogOverview, {
        width: '250px',
        height: '250px',
        data: { weight: setWeight(weight),
                exists: getExists()}
    });

    return new Promise((resolve, reject)=>{
      dialogRef.afterClosed().subscribe(result => {
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
