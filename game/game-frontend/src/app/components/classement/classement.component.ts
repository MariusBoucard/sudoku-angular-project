import {Component, OnInit} from '@angular/core';
import {Player} from 'src/app/classes/player';
import {MatTableDataSource} from "@angular/material/table";

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
    player1.setScore(69);
    let player2 = new Player("Godefroid");
    player2.setScore(42);
    let player3 = new Player("senslanu");
    player3.setScore(420);
    this.addToClassement(player1);
    this.addToClassement(player2);
    this.addToClassement(player3);

    //EN SCREED CA PEUT ETRE COOL LA TITE REQUETE HTTP TAVU
  }

  /**
   *
   * @param joueur is the player we want to add to the classement.
   * At the end of the game only, we can check his score and insert it in the right place in the placement.
   *
   */
  addToClassement(joueur: Player) {
    this.classement.push(joueur);
    this.classement.sort((p1, p2) => (p1.score < p2.score ? -1 : 1)); //pas optimal mais c'est déjà ça
  }

  getClassement(): Player[] {
    return this.classement;
  }

  getTop5() : Player[] {
    return this.classement.slice(0,5); //marche pas, je sais pas pourquoi...
  }


  dataSource = new MatTableDataSource(this.getClassement());
  displayedColumns: string[] = ['name', 'score'];
}
