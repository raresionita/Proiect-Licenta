import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from './dialog.data';
import { setDirected, setExists } from '../canvas/shared/canvas.functions';

@Component({
    selector:'dialog-component',
    templateUrl: './dialog.component.html'
})

export class DialogOverview{
    constructor(
        public dialogRef:MatDialogRef<DialogOverview>,
        @Inject(MAT_DIALOG_DATA) public data?: DialogData
    ) {}

    isDirected(){
      //setExists(true)
      setDirected(true)
    }

    isUndirected(){
      //setExists(true)
      setDirected(false)
    }
}
