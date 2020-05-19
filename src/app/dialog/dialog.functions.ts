import { MatDialog } from '@angular/material';
import { DialogOverview } from './dialog.component';
import { setWeight, getExists, getSelectDirected, getSelectUndirected} from '../canvas/shared/graph/canvas.functions';
import Parameter from '../canvas/shared/parameters';

class Dialog{

  constructor(public dialog:MatDialog){}

  openDialog = () => {
    const dialogRef = this.dialog.open(DialogOverview, {
        width: '250px',
        height: '250px',
        data: { weight: setWeight(Parameter.weight),
                exists: getExists(),
                selectDir: getSelectDirected(),
                selectUndir: getSelectUndirected()}
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
