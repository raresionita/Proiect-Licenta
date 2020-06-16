import { DFS } from './DFS';
import { AlgorithmStrategy } from './algorithmStrategy';
import Parameter from '../parameters';
import { Stack } from 'stack-typescript';
import GraphVar from '../graph/graph';


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

  getTranspose(){
    var graph = GraphVar
    var key = Array.from(Parameter.circles.keys());
    for(var v=0;v<Parameter.circles.size;v++){
      var id = key[v]
      for(var i=0;i<Parameter.adjList.get(id).size;i++){
        graph.insertAdjacencyList(i,id)
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

    var keys = Array.from(Parameter.circles.keys());
    for(var i=0;i<Parameter.circles.size;i++){
      var idx = keys[i];
      if(visited[idx] == false){
        this.DFSUtil(idx,visited,stack);
      }
    }

    var gr:any =  this.getTranspose()

    for(var i=0;i<Parameter.circles.size;i++){
      visited[i] = false;
    }

    while(stack.top !== null || stack.length !== 0){
      var v = stack.pop();

      if(visited[v] == false){
        gr.fillOrder(v,visited);
      }
    }

  }
}
