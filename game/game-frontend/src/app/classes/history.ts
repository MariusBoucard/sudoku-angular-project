import {TreeUndoHistory, Undoable} from "interacto";

export class History {
  oldGridsTree: TreeUndoHistory | undefined;
  sizeMax: number | undefined;
  undos: Undoable[] = [];
  redos: Undoable[] = [];

  constructor() {
    //TODO
  }

  add(commande: Undoable) {
    //TODO
  }

  undo() {
    //TODO
  }


}
