import { EventEmitter, Injectable } from '@angular/core';
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
   help = false;
   gameEnded = false;
   currentGame : Game = new Game(this.grid,this.player);
   gameEndedValueChanges : EventEmitter<any> = new EventEmitter();
   ScoreValueChanges : EventEmitter<any> = new EventEmitter();


   fillGame(data : GridDTO){
      this.currentGame.grid.id = data.id;

      data.classement.classement.forEach(player => {
        this.currentGame.grid.classement.addToClassement(player)
      });

      console.log(this.currentGame.grid.classement.classement);
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
    this.gameEnded = false;

   }
   updateSuggestedValues(){
    for(let i =0;i<this.currentGame.grid.tileList.length;i++){
      this.currentGame.grid.tileList[i].suggestedValues = this.currentGame.grid.getSuggestedValue(i);
    }
   }
   isGameFinished():boolean{
    let check = true;
    for(let i =0;i<this.currentGame.grid.tileList.length;i++){
      if(this.currentGame.grid.tileList[i].constraintRespected === false ||this.currentGame.grid.tileList[i].getValue()<1 ){
        check = false;
        this.gameEnded =false;
        break;
      }
    }
    if(check){
      this.gameEnded =true;
      console.log("gamefinished oueoue")
      this.gameEndedValueChanges.emit(this.gameEndedValueChanges); 
    }
    return check;
   }

   updateConstraintRespected(){
    for(let i =0;i<this.currentGame.grid.tileList.length;i++){
      this.currentGame.grid.tileList[i].constraintRespected = this.currentGame.grid.checkTile(i);
    }
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
   addScore(){
    console.log("n addscore");
    this.currentGame.player.score++;
    this.ScoreValueChanges.emit(this.ScoreValueChanges); 

    console.log(this.currentGame.player.score);
   }

   endGame(){
    console.log("\n\n\n\n ENDGAME \n\n\n");
    this.backService.sendPlayer(this.player,this.currentGame.grid.id);

   }
   setValue(index : number,valeur:number){
    this.currentGame.grid.setValue(index,valeur);
   }

   getTile(index : number){
    return this.currentGame.grid.getTile(index);
   }
}



