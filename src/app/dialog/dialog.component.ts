import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from './dialog.data';
import { setDirected, setSelectDirected, setSelectUndirected, disableBtn } from '../canvas/shared/graph/canvas.functions';

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
      setSelectUndirected("false")
      disableBtn("undirectedBtn")
    }

    isUndirected(){
      setDirected("false")
      setSelectDirected("false")
      disableBtn("directedBtn")
      disableBtn("topologicBtn")
      disableBtn("stronglyBtn")
    }
}
