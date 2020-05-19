import { DFS } from './DFS'
import Parameter from '../parameters'
import { AlgorithmStrategy } from './algorithmStrategy'


export class DetectCycleDirected extends DFS implements AlgorithmStrategy{

  DFSUtil(v: number, visited: boolean[], stack: boolean[]) {
    visited[v] = true
    stack[v] = true
    var res:boolean = false

    const children:number[] = Parameter.adjList.get(v)

    for(var c of children){
      if(visited[c] && stack[c]){
        res = true
      }

      if(!visited[c] && !res){
        res = this.DFSUtil(c,visited,stack)
      }
    }

    stack[v] = false
    return res
  }

  algorithmStrategy():boolean {
    var visited:any[] = [Parameter.circles.size]
    var recStack:any[] = [Parameter.circles.size]

    for(var i=0;i<Parameter.circles.size;i++){
        visited[i] = false
    }

    for(var i=0;i<Parameter.circles.size;i++){
      recStack[i] = false
    }

    return this.DFSUtil(0,visited,recStack)
  }

}
