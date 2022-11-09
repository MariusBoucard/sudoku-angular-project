import { Component, Inject, OnInit} from '@angular/core';
import { Bindings, TreeUndoHistory, UndoableSnapshot } from 'interacto';
import { PartialMatSelectBinder } from 'interacto-angular';
// import { TreeHistoryComponent } from 'interacto-angular';
import { setValue } from 'src/app/commands/setValue';
import { GameService } from 'src/app/services/game.service';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  //Default value here to prevent error
  

  // @ViewChild('treeComp')
  // private treeComp: TreeHistoryComponent;
  
  constructor(@Inject('gameServ')  public gameService : GameService,public History: TreeUndoHistory, public bindings: Bindings<TreeUndoHistory>) { }

  ngOnInit(): void {
  }

  incrScore(){
    this.gameService.setScore(this.gameService.getScore()+1);
  }

  public setValue(binder: PartialMatSelectBinder, index: number) {
    binder.toProduce(() => new setValue(index,5,this.gameService ))
    .bind();
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
    this.gameService.player.setName(newName);
  }
  //From the help manual in moodle
  rootRenderer(): UndoableSnapshot {
    return setValue.getSnapshot(this.gameService.currentGame);
  }
}
