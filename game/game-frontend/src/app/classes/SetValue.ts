import {Tile} from "./tile";

export class SetValue {
  value: number = -1;
  tile: Tile | undefined;

  constructor() {
    //TODO
  }

  setValue(tile: Tile, value: number) {
    tile.setValue(value);
  }

}
