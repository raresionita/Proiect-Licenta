import { AlgorithmStrategy } from "./algorithmStrategy";
import { DFS } from './DFS';
import Parameter from '../parameters';


export class DetectCycleUndirected extends DFS implements AlgorithmStrategy{

  DFSUtil(v: number, visited: boolean[], parent: any) {
    visited[v] = true
    var res:boolean = false

    const children:number[] = Parameter.adjList.get(v)
    for(var c of children){
      if(c != parent){
        if(visited[c]){
          res = true;
        }

        if(!visited[c] && !res){
          res = this.DFSUtil(c,visited,v);
        }
      }
    }

    return res;
  }

  algorithmStrategy() {
    var visited = new Array();
    var res:boolean = false

    var keys = Array.from(Parameter.circles.keys());

    for(var i=0;i<Parameter.circles.size;i++){
      var idx = keys[i]
      visited[idx] = false
    }

    for(var i=0;i<Parameter.circles.size;i++){
      var idx = keys[i];
      if(this.DFSUtil(idx,visited,-1)){
        res = true
      }else{
        res = false
        for(var j in visited)
          visited[j] = false
      }
    }

    return res
  }


}
