import { AlgorithmStrategy } from "./algorithmStrategy";
import { DFS } from './DFS';
import Parameter from '../parameters';


export class DetectCycle extends DFS implements AlgorithmStrategy{

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

    var visited:any[] = [Parameter.circles.size]

    for(var i=0;i<Parameter.circles.size;i++){
      visited[i] = false
    }

    return this.DFSUtil(0,visited,-1);
  }


}
