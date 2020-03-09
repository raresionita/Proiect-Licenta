import { DFS } from './DFS';
import { AlgorithmStrategy } from './algorithmStrategy';
import Parameter from '../parameters';
import { setComponent } from '../canvas.functions';
import { Stack } from 'stack-typescript';

export class TopologicalSort extends DFS implements AlgorithmStrategy{

    DFSUtil(v: number, visited: boolean[], stack: any) {
        visited[v] = true

        Parameter.adjList.get(v).forEach(i => {
            if(!visited[i]){
                this.DFSUtil(i,visited,stack)
            }
        });
        stack.push(v)
    }
    
    algorithmStrategy() {
        var stack:Stack<number> = new Stack()
        var visited:any = [Parameter.circles.size]

        for(var i=0;i<Parameter.circles.size;i++){
        visited[i] = false
        }

        for(var i=0;i<Parameter.circles.size;i++){
            if(visited[i] == false){
                this.DFSUtil(i,visited,stack)
            }
        }

        var vals = []
        while(stack.top !== null || stack.length !== 0){
            vals.push(stack.pop())
        }
        setComponent("message",vals)
    }

}