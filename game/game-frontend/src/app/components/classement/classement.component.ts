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
    this.gameService.currentGame.grid.classement.classement.forEach(element => {
          this.addToClassement(element);

    });

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

  /**
   * getter standard pour récupérer un classement
   * @returns un tableau de player qui en soit esdt un classement
   */
  getClassement(): Player[] {
    return this.classement;
  }


  dataSource = new MatTableDataSource(this.getClassement());
  displayedColumns: string[] = ['name', 'score'];
}
