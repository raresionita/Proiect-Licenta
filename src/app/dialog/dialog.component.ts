import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from './dialog.data';
import { setDirected } from '../canvas/shared/canvas.functions';

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
      setDirected("true")
    }

    isUndirected(){
      setDirected("false")
    }
}
