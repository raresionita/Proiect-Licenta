import { Component } from "@angular/core";
import { clearCanvas } from '../canvas/shared/graph/init-canvas';
import 'fabric';
import { setAction, enableBtn, setMessage } from '../canvas/shared/canvas.functions';
import { MatDialog } from '@angular/material';
import { Dialog, setDialog } from '../dialog/dialog.functions';
import { Graph } from '../canvas/shared/graph/graph';
//import GraphVar from '../canvas/shared/graph/graph';

@Component({
    selector: 'nav-bar',
    templateUrl: './nav-bar.component.html',
})

export class NavBarComponent{
  Graph = new Graph()

  constructor(public dialog: MatDialog){
    setDialog(new Dialog(dialog))
  }

  confirmClear() {
    this.Graph.resetCanvas()
    clearCanvas()
    enableBtn()
  }

  addVertex(){
    setMessage("Click on canvas to add a new vertex")
    setAction(0)
    this.Graph.resetGraphColorSelected()
  }

  connectVertex(){
    setMessage("Select two vertices to connect")
    setAction(1)
  }

  defaultSelected(){
    setMessage("Select and move objects by mouse")
    setAction(2)
    this.Graph.resetGraphColorSelected()
  }

  removeObject(){
    setMessage("Click on the object to remove")
    setAction(3)
    this.Graph.resetGraphColorSelected()
  }


  import(){
    this.Graph.importFromFile()
  }

  export(){
    this.Graph.exportToFile()
  }

  detectCycleUndirected(){
    if(this.Graph.detectCycleUndirected.Algorithm.algorithmStrategy()){
      setMessage("Graph contains cycle")
    }else{
      setMessage("Graph doesn't contain cycle")
    }
  }

  detectCycleDirected(){
    if(this.Graph.detectCycleDirected.Algorithm.algorithmStrategy()){
      setMessage("Graph contains cycle")
    }else{
      setMessage("Graph doesn't contain cycle")
    }
  }

  topologicSort(){
    this.Graph.topologicSort.Algorithm.algorithmStrategy()
  }

  stronglyConnected(){
    this.Graph.strongly.Algorithm.algorithmStrategy();
  }
}

export default NavBarComponent
