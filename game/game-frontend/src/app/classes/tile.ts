export class Tile {
  value: number;
  suggestedValues: number[] = [];
  constraintRespected: boolean = false;
  modifiable : boolean = false;

  constructor(nombre: number = -1) {
    this.value = nombre;
    if(nombre===0){
      this.modifiable = true;
    }
  }

  /**
   *
   * @param value is the new value we put to the tile
   *
   * Be careful, we don't check the validity of the value here
   * and so, we don't update constraintRespected, neither suggestedValues
   */
  setValue(value: number) {
    this.value = value;
  }

  /**
   * 
   * @returns number de la val de la tile
   */
  getValue(){
    return this.value;
  }

  /**
   * 
   * @returns true if we can modify the tile
   */
  isModifiable(){
    return this.modifiable;
  }

}
