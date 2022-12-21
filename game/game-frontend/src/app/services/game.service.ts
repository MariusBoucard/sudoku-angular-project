import { Injectable } from '@angular/core';
import { Classement } from '../classes/classement';
import { Game } from '../classes/game';
import { Grid } from '../classes/grid';
import { Player } from '../classes/player';
import { Tile } from '../classes/tile';
import { GridDTO } from '../DTO/grid-dto';
import { BackendServiceService } from './backend-service.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private grid : Grid,public player:Player,private backService : BackendServiceService) {

   }
   currentGame : Game = new Game(this.grid,this.player);

   fillGame(data : GridDTO){
      this.currentGame.grid.id = data.id;
      data.classement.classement.forEach(player => this.currentGame.grid.classement.addToClassement(player));
      let listnum = new Array(81);

      data.values.forEach((tile: Tile) => listnum.push(tile.value));

        this.currentGame.grid.setTiles(listnum);
        this.currentGame.grid.checkTiles();

   }

   setGrid(n:number,joueur: String){
    let play = new Player(joueur);
    this.backService.getGrid(n).subscribe(
      (data:any) => this.fillGame(data),
      (error: any) => console.log(error),
      () => console.log("completed")
    );
    this.currentGame.player = play;

   }
   getSelected():number{
    return this.currentGame.grid.selectedTabName;
   }
   setSelected(index : number){
    this.currentGame.grid.selectedTabName=index;
   }
   getValue(index : number):number{
    return this.currentGame.grid.tileList[index].value;
   }
   getSuggestedValue(index : number):number[]{
    return this.currentGame.grid.getSuggestedValue(index);
   }
   getClassement(): Classement {
      return this.currentGame.grid.getClassement();
   }
   contraintRespected(index : number):boolean{
    return this.currentGame.grid.tileList[index].constraintRespected;
   }
   getScore(){
    return this.currentGame.player.getScore();
   }
   setScore(score : number){
    this.currentGame.player.setScore(score);
   }

   setValue(index : number,valeur:number){
    this.currentGame.grid.setValue(index,valeur);
   }

   getTile(index : number){
    return this.currentGame.grid.getTile(index);
   }
}



