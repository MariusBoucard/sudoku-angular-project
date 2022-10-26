import { Component, OnInit } from '@angular/core';
import { Player } from 'src/app/classes/player';
import { GridComponent } from '../grid/grid.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  //Default value here to prevent error
  player : Player = new Player("Sly Bar");
  history : History | undefined;
  grid : GridComponent = new GridComponent;
  constructor() { }

  ngOnInit(): void {
  }
  incrScore(){
    this.player.setScore(this.player.getScore()+1);
  }

/**
 * We have to define some action 
 * at the end of the game -> but still we have to determinate a way to 
 * say that it's finished
 */
  endGame(){
    //TODO -> ADD Player to grid classement
    //Display message
    //maybe do boolean
  }
  //Est ce qu'on change pas l'UML Par hasard
  /**
   * 
   * @param newName new name of the player
   * This function aim to change the name of the player during the game
   */
  changeName(newName : String){
    this.player.setName(newName);
  }
}
