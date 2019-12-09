
const graph = () => {
    //lista noduri
    this.nodes = []
    //lista muchii
    this.edges = []
    //id unic al noului graf
    this.uidGraph = 0;
	// Unique Id of new edge.
	this.uidEdge = 10000;
	// Has direction edge.
	this.hasDirect = false;
}

graph.prototype.AddNewNode = (nod) =>{
    if(this.nodes.length < 300){
        nod.SetId(this.uidGraph);
        this.uidGraph = this.uidGraph + 1;
        this.nodes.push(nod);
    }
    return this.nodes.length - 1;
}