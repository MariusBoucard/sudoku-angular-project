export class Tile {
    value : number = -1;
    suggestedValues : number[] = [];
    constraintRespected : boolean = false;

    constructor(nombre : number){
        this.value=nombre;
    }

}
