import {Component, Inject, OnInit} from '@angular/core';
import {Player} from 'src/app/classes/player';
import {MatTableDataSource} from "@angular/material/table";
import {MatDialogRef} from "@angular/material/dialog";
import { GameService } from 'src/app/services/game.service';

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
  constructor(public dialogRef: MatDialogRef<ClassementComponent>,@Inject('gameServ')  public gameService : GameService) {
  }

  ngOnInit(): void {
    // let player1 = new Player("Dimitri");
    // player1.setScore(69);
    // let player2 = new Player("Godefroid");
    // player2.setScore(42);
    // let player3 = new Player("senslanu");
    // player3.setScore(420);
    // let player4 = new Player("p1");
    // player4.setScore(50);
    // let player5 = new Player("p2");
    // player5.setScore(20);
    // let player6 = new Player("p3");
    // player6.setScore(220);
    // let player7 = new Player("p4");
    // player7.setScore(820);
    // let player8 = new Player("p5");
    // player8.setScore(40);
    // this.addToClassement(player1);
    // this.addToClassement(player2);
    // this.addToClassement(player3);
    // this.addToClassement(player4);
    // this.addToClassement(player5);
    // this.addToClassement(player6);
    // this.addToClassement(player7);
    // this.addToClassement(player8);
    this.gameService.currentGame.grid.classement.classement.forEach(element => {
          this.addToClassement(element);

    });

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
    if (this.classement.length >= 5){
      this.classement = this.classement.slice(0,5);
    }
  }

  getClassement(): Player[] {
    return this.classement;
  }

  getTop5(){
    this.dataSource = new MatTableDataSource(this.classement.slice(0,5));
  }


  dataSource = new MatTableDataSource(this.getClassement());
  displayedColumns: string[] = ['name', 'score'];
}
