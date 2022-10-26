import { Injectable } from "@angular/core";
import { Player } from "./player";
@Injectable()
export class Classement {
    classement: Player[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }

  /**
   *
   * @param joueur is the player we gonna add to the classement.
   * At the end of the game only, we can check his score and insert it in the right place in the placement.
   *
   */
  addToClassement(joueur: Player) {
    //TODO use of stream to add at the right place ?
  }

  getClassement(): Player[] {
    return this.classement;
  }
}
