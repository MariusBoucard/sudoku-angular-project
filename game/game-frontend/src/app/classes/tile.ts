export class Tile {
  value: number;
  suggestedValues: number[] = [];
  constraintRespected: boolean = false;

  constructor(nombre: number = -1) {
    this.value = nombre;
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

}
