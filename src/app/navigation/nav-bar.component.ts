import { Component } from "@angular/core";
import { clearCanvas } from '../canvas/shared/init-canvas';
import 'fabric';
import { setAction, enableBtn, setMessage, disableId, disableBtn } from '../canvas/shared/canvas.functions';
import { MatDialog } from '@angular/material';
import { Dialog, setDialog } from '../dialog/dialog.functions';
import GraphVar from '../canvas/shared/graph';
import { TopologicalSort } from '../canvas/shared/strategy/topologicalSort';
import Context from '../canvas/shared/strategy/context';
import Parameter from '../canvas/shared/parameters';

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

  detectCycleUndirected(){
    if(GraphVar.detectCycleUndirected.Algorithm.algorithmStrategy()){
      setMessage("Graph contains cycle")
    }else{
      setMessage("Graph doesn't contain cycle")
    }
  }

  detectCycleDirected(){
    if(GraphVar.detectCycleDirected.Algorithm.algorithmStrategy()){
      setMessage("Graph contains cycle")
    }else{
      setMessage("Graph doesn't contain cycle")
    }
  }

  topologicSort(){
    GraphVar.topologicSort.Algorithm.algorithmStrategy()
  }

  stronglyConnected(){
    console.log("Strongly connected components: \n")
    GraphVar.strongly.Algorithm.algorithmStrategy();
  }

  shortestPath(){
    //ToDo
  }
}

export default NavBarComponent
