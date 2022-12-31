import {Component, Inject, OnInit} from '@angular/core';
import {Player} from 'src/app/classes/player';
import {MatTableDataSource} from "@angular/material/table";
import {MatDialogRef} from "@angular/material/dialog";
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-endgame-dialog',
  templateUrl: './endgame-dialog.component.html',
  styleUrls: ['./endgame-dialog.component.css']
})
/**
 * This class has one instance for each grid
 * In it we can find the players that played the grid
 * and the score they did on it. Because it is a component
 * we gotta do some display on it, and add some functions
 */
export class EndgameDialogComponent implements OnInit {
  classement: Player[] = [];

  constructor(public dialogRef: MatDialogRef<EndgameDialogComponent>,@Inject('gameServ')  public gameService : GameService) {
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
    this.addToClassement(this.gameService.currentGame.player);

    this.gameService.currentGame.grid.classement.classement.forEach(element => {
      this.addToClassement(element);
    
    });
    console.log(this.classement);
      this.classement.sort((p1, p2) => (p1.score < p2.score ? -1 : 1)); //pas optimal mais c'est déjà ça
      if (this.classement.length >= 5){
        this.classement = this.classement.slice(0,5);
      }

  }


  /**
   *
   * @param joueur is the player we want to add to the classement.
   * At the end of the game only, we can check his score and insert it in the right place in the placement.
   *
   */
  addToClassement(joueur: Player) {
    this.classement.push(joueur);
   
  }

  getClassement(): Player[] {
    return this.classement;
  }


  dataSource = new MatTableDataSource(this.getClassement());
  displayedColumns: string[] = ['name', 'score'];
}
