import {Component, OnInit} from '@angular/core';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],
})

/**
 * Component that display the grid
 */
export class GridComponent implements OnInit {
  
  constructor(public gameService : GameService){

  }
  ngOnInit(){}
  indexArray = new Array(81).fill(null).map((_, i) => i);

  /**
   * Display function that permit to interact with user by changing the current hovered tile and to maybe add update later
   * @param tab index of the tile hovered
   */

  contraintRespected(index : number):boolean{
    return this.gameService.contraintRespected(index);
  
  }


  hovered(tab: number) {
    this.gameService.setSelected(tab);
  }

  /**
   * This function aim to do the opposit thing than the previous on hovered
   * @param tab index of the tab we just quit with the mouse
   */
  unhovered(tab: number) {
    if (this.gameService.getSelected() === tab) {
      this.gameService.setSelected(-1);

    }

  }
  getValue(index : number):number{
    return this.gameService.getValue(index);
  }
  getSuggestedValues(index : number):number[]{
    console.log("suggestedvalues : "+ this.gameService.getSuggestedValue(index));
    return this.gameService.getSuggestedValue(index);
  }
  getSelected(n : number):number{
    return this.gameService.getSelected();
  }

  /**
   *
   * @param n index in the tab
   * @returns return the css class to apply to the tile to make it really beautiful (Just joking bro)
   */
  getClass(n: number): String {
    let retour = "grid-item ";
    if (n == 80) {
      return retour;
    }

    if (((n + 1) % 3) == 0) {
      retour += ' lignedroite ';
    }
    if (((n) % 27) < 9) {
      retour += ' lignebas ';
    }
    return retour + "";

  }
}
