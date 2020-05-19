import EdgeCustom from "./graph/edge"

class Parameters{
    actionType = 0
    Id = 0
    objectSelected = null
    selectDirected:boolean = null
    selectUndirected:boolean = null
    weight:any
    isDirected:string
    exists:EdgeCustom
    selected = []
    edges = []
    adjList = new Map<number, any>()
    circles = new Map<number, any>()
}

const Parameter = new Parameters()

export default Parameter


