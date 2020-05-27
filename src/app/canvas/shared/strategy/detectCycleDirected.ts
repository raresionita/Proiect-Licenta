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

  visited:any[] = [Parameter.circles.size]
  recStack:any[] = [Parameter.circles.size]

  init(){
    for(var i=0;i<Parameter.circles.size;i++){
      this.visited[i] = false
    }

    for(var i=0;i<Parameter.circles.size;i++){
      this.recStack[i] = false
    }
  }

  algorithmStrategy():boolean {
    for(var i=0;i<Parameter.circles.size;i++){
        this.visited[i] = false
    }

    for(var i=0;i<Parameter.circles.size;i++){
      this.recStack[i] = false
    }

    var hasCycle = null;

    for(var i=0;i<Parameter.circles.size;i++){
      if(i==0){
        hasCycle = this.DFSUtil(0,this.visited,this.recStack)
      }else{
        this.init()
        hasCycle = this.DFSUtil(i,this.visited,this.recStack)
      }
    }
    return hasCycle;
  }

}
