import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from './dialog.data';
import { setDirected, setSelectDirected, setSelectUndirected, disableBtn, setBidirected } from '../canvas/shared/canvas.functions';

@Component({
    selector:'dialog-component',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.css']
})

export class DialogOverview{
    constructor(
        public dialogRef:MatDialogRef<DialogOverview>,
        @Inject(MAT_DIALOG_DATA) public data?: DialogData
    ) {}

    isDirected(){
      setDirected("true")
      setBidirected("false")
      setSelectUndirected("false")
      disableBtn("undirectedBtn")
    }

    isBidirected(){
      setBidirected("true")
      setDirected("false")
      disableBtn("undirectedBtn")
      setSelectUndirected("false")
    }

    isUndirected(){
      setDirected("false")
      setBidirected("false")
      setSelectDirected("false")
      disableBtn("directedBtn")
      disableBtn("topologicBtn")
      disableBtn("stronglyBtn")
    }
}
