import { Component } from "@angular/core";
import { clearCanvas, canvas } from '../canvas/shared/init-canvas';
import 'fabric';
import { setAction, enableBtn, setMessage } from '../canvas/shared/canvas.functions';
import { MatDialog } from '@angular/material';
import { Dialog, setDialog } from '../dialog/dialog.functions';
import GraphVar from '../canvas/shared/graph';

@Component({
    selector: 'nav-bar',
    templateUrl: './nav-bar.component.html',
})

export class NavBarComponent{

  constructor(public dialog: MatDialog){
    setDialog(new Dialog(dialog))
  }

  confirmClear() {
    clearCanvas()
    enableBtn()
    GraphVar.resetCanvas()
  }

  addVertex(){
    setMessage("Click on canvas to add a new vertex")
    setAction(0)
    GraphVar.resetGraphColorSelected()
  }

  connectVertex(){
    setMessage("Select two vertices to connect")
    setAction(1)
  }

  defaultSelected(){
    setMessage("Select and move objects by mouse")
    setAction(2)
    GraphVar.resetGraphColorSelected()
  }

  removeObject(){
    setMessage("Click on the object to remove")
    setAction(3)
    GraphVar.resetGraphColorSelected()
  }


  import(){
    GraphVar.importFromFile()
  }

  export(){
    GraphVar.exportToFile()
  }

  detectCycle(){
    if(GraphVar.isCyclic()){
      console.log("Graph contains cycle")
    }else{
      console.log("Graph doesn't contains cycle")
    }
  }

  topologicSort(){
    GraphVar.topologicalSort()
  }

  stronglyConnected(){
    //ToDo  
  }

  shortestPath(){
    //ToDo
  }
}

export default NavBarComponent
