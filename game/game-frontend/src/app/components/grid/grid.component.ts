import {Component, HostListener, Inject, OnInit} from '@angular/core';
import { PartialButtonBinder, PartialPointBinder } from 'interacto';
// import { PartialPointBinder } from 'interacto';
import {  PartialMatSelectBinder } from 'interacto-angular';
import { setValue } from 'src/app/commands/setValue';
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
  // @Output() myEvent = new EventEmitter<string>();
  //The inject is meant to use the same gameService for both gamecomponent and grid
  constructor(@Inject('gameServ')  public gameService : GameService){
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
    // console.log("suggestedvalues : "+ this.gameService.getSuggestedValue(index));
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

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
      if(this.gameService.getSelected() !== -1){
        if(Number(event.key)  )
        this.gameService.setValue(this.gameService.getSelected(),(event.key as unknown as number));
      }


  }

  public setValue(binder: PartialMatSelectBinder, index: number) {
    console.log("Backtracking setValue : here in gridcomponent");

    binder.toProduce(i => new setValue( index, i.change?.value ,this.gameService))
    .bind();
    // this.myEvent.emit('yolo');
    }

    public directSet(binder: PartialPointBinder) {
      console.log("into direct");
      binder
      .toProduce(() =>
      new setValue(1,this.gameService.getSuggestedValue(1)[0],this.gameService))
      .when(i => i.button === 2)
      .bind();
      }
      public binderClickEndGame(binder: PartialButtonBinder): void {
        binder
          .toProduceAnon(() => this.showEndGame())
          .bind();
      }
      public showEndGame(){
        console.log("finish")
      }
}
