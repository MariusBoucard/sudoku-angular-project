import { Component, Inject, OnInit} from '@angular/core';
import { Bindings, TreeUndoHistory, UndoableSnapshot } from 'interacto';
// import { TreeHistoryComponent } from 'interacto-angular';
// import { TreeHistoryComponent } from 'interacto-angular';
import { setValue } from 'src/app/commands/setValue';
import { GameService } from 'src/app/services/game.service';
import {ClassementComponent} from "../classement/classement.component";
import {MatDialog} from "@angular/material/dialog";


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']

})
export class GameComponent implements OnInit {

  //Default value here to prevent error


  indexArray = new Array(81).fill(null).map((_, i) => i);
  scoreintra : number = 0;
  constructor(@Inject('gameServ')  public gameService : GameService, public bindings: Bindings<TreeUndoHistory>,
  public dialog: MatDialog) {
    this.gameService.gameEndedValueChanges.subscribe(valeur => {
      console.log('ouais le jeu est fini ? : ', valeur);
      if(valeur){
        this.endGame();
      }
   })

   this.gameService.ScoreValueChanges.subscribe(() => {
    this.scoreintra = this.gameService.getScore();
 })
 
   }

  ngOnInit(): void {
    

  }

  public ngAfterViewInit(): void {
  }
  incrScore(){
    this.gameService.setScore(this.gameService.getScore()+1);
  }


    //From the help manual in moodle

  public rootRenderer(): UndoableSnapshot {
    console.log("Try rootrender");
    return setValue.getSnapshot(this.gameService.currentGame);
    }

/**
 * We have to define some action
 * at the end of the game -> but still we have to determinate a way to
 * say that it's finished
 */
  endGame(){
    console.log(this.gameService.currentGame.grid.classement.classement);

    this.gameService.endGame();
   
    //TODO -> ADD Player to grid classement

  }

  //Est ce qu'on change pas l'UML Par hasard
  /**
   *
   * @param newName new name of the player
   * This function aim to change the name of the player during the game
   */
  changeName(newName : String){
    this.gameService.player.setName(newName);
  }

  openDialog() {
    // @ts-ignore
    const dialogRef = this.dialog.open(ClassementComponent);
    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
