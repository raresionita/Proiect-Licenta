import { DFS } from './DFS';
import { AlgorithmStrategy } from './algorithmStrategy';
import Parameter from '../parameters';
import { Stack } from 'stack-typescript';
import { setComponent } from '../canvas.functions';
import GraphVar from '../graph';


export class StronglyConnected extends DFS implements AlgorithmStrategy {

  DFSUtil(v: number, visited: boolean[], stack: any) {
    visited[v] = true

    Parameter.adjList.get(v).forEach(i => {
        if(!visited[i]){
            this.DFSUtil(i,visited,stack)
        }
    });
    stack.push(v)
  }

  getTranspose = () =>{
    var graph = GraphVar //circular dependency to solve
    for(var v=0;v<Parameter.circles.size;v++){
      for(var i=0;i<Parameter.adjList.get(v).size;i++){
        graph.insertAdjacencyList(i,v)
      }
    }
    return graph
  }

  algorithmStrategy() {
    var stack:Stack<number> = new Stack();
    var visited:any = [Parameter.circles.size];

    for(var i=0;i<Parameter.circles.size;i++){
        visited[i] = false;
    }

    for(var i=0;i<Parameter.circles.size;i++){
      if(visited[i] == false){
        this.DFSUtil(i,visited,stack);
      }
    }

    var gr = this.getTranspose()

    for(var i=0;i<Parameter.circles.size;i++){
      visited[i] = false;
    }

    var vals = []
    while(stack.top !== null || stack.length !== 0){
      var v = stack.pop();

      vals.push(v);
      if(visited[v] == false){
        gr.fillOrder(v,visited);
      }
    }
    setComponent("message",vals,"Strongly connected: ")

  }
}
