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
        var stack = new Stack()
        var visited = new Array()

        var keys = Array.from(Parameter.circles.keys());

        for(var i=0;i<Parameter.circles.size;i++){
          var idx = keys[i]
          visited[idx] = false
        }


        for(var i=0;i<Parameter.circles.size;i++){
            var idx = keys[i];
            if(visited[idx] == false){
                this.DFSUtil(idx,visited,stack)
            }
        }

        var vals = []
        while(stack.top !== null || stack.length !== 0){
            vals.push(stack.pop())
        }
        setComponent("message",vals,"Topological Sort: ",false)
    }

}
