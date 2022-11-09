import { Injectable } from '@angular/core';
import { Classement } from '../classes/classement';
import { Game } from '../classes/game';
import { Grid } from '../classes/grid';
import { Player } from '../classes/player';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private grid : Grid,public player:Player) {

   }
   currentGame : Game = new Game(this.grid,this.player);

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

   setValue(id : number,valeur:number){
    this.currentGame.grid.setValue(id,valeur);
   }

   getTile(index : number){
    return this.currentGame.grid.getTile(index);
   }
}

