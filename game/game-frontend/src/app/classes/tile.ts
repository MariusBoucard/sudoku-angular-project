export class Tile {
    value : number = -1;
    suggestedValues : number[] = [];
    constraintRespected : boolean = false;

    constructor(nombre : number){
        this.value=nombre;
    }

    /**
     * 
     * @param value is the new value we put to the tile
     * 
     * Be carefull, we don't check the validity of the value here
     * and so, we don't update constraintRespected, neither suggestedValues
     */
    setValue(value : number){
        this.value = value;
    }

}
