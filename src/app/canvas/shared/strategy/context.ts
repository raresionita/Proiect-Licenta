import { AlgorithmStrategy } from "./algorithmStrategy";

class Context {
    algorithmStrategy:AlgorithmStrategy

    constructor(algorithmStrategy:AlgorithmStrategy){
        this.algorithmStrategy = algorithmStrategy
    }

    public get Algorithm() : any {
        return this.algorithmStrategy
    }

}

export default Context
