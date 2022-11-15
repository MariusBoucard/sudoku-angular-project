import {Component, OnInit} from '@angular/core';
import {Player} from 'src/app/classes/player';

@Component({
  selector: 'app-classement',
  templateUrl: './classement.component.html',
  styleUrls: ['./classement.component.css']
})
/**
 * This class has one instance for each grid
 * In it we can find the players that played the grid
 * and the score they did on it. Because it is a component
 * we gotta do some display on it, and add some functions
 */
export class ClassementComponent implements OnInit {
  classement: Player[] = [];

  constructor() {
  }

  ngOnInit(): void {
    let player1 = new Player("Dimitri");
    player1.setScore(42);
    let player2 = new Player("Godefroid");
    player2.setScore(69);
    let player3 = new Player("senslanu");
    player3.setScore(420);
    this.classement.push(player1);
    this.classement.push(player2);
    this.classement.push(player3);

    //EN SCREED CA PEUT ETRE COOL LA TITE REQUETE HTTP TAVU
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
