import { Component, Inject, OnInit } from '@angular/core';
// import { Observable } from 'rxjs';
import { Grid } from 'src/app/classes/grid';
import { Player } from 'src/app/classes/player';
import { GridDTO } from 'src/app/DTO/grid-dto';
import { BackendServiceService } from 'src/app/services/backend-service.service';
import { GameService } from 'src/app/services/game.service';
// import { BackendServiceService } from 'src/app/services/backend-service.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  
  joueur : Player = new Player('Topin');
  Allgrids : Array<GridDTO> =new Array<GridDTO>;
  difficultes : String[] = ["easy","medium","hard","very-hard","insane","inhuman"]
  choosedDifficulte = "easy";
  fakeArray: number[] = [];
  grille : Grid = new Grid();
  failure!: boolean;


  constructor(private backService : BackendServiceService,@Inject("gameServ") private gameService : GameService) {
    let that = this;
    this.backService.getAllGrids().subscribe({
      next(list) {that.Allgrids = list; that.failure = false; },
      error(err) {that.failure = true; console.error(err)}
    } );


    console.log("test "+this.Allgrids);

  }
  
  generateGrid(){
    this.backService.generateGrid(this.choosedDifficulte).subscribe(gride =>{
        this.grille = gride;

     });
    //TODO Ca m'a gavé on va faire avec des promises
  }


  /**
   * const promise = new Promise(function(resolve, reject) {
  setTimeout(function() {
    resolve('Promise returns after 1.5 second!');
  }, 1500);
});
promise.then(function(value) {
  console.log(value);
  // Promise returns after 1.5 second!
});
pk pas ca
   */
  
  ngOnInit(): void {

    this.fakeArray = new Array(81).fill(null).map((_, i) => i);
    // console.log(this.test+"Test 2 ");

  }


  launchGame(n : number){
    this.gameService.setGrid(n,this.joueur.getName());
    //TODO
    /**
     * Has to keep name in memory -> Saved in gameservice
     * inject gameservice des le debut ? Single instance ?
     */
  }
  setPlayer(name : String){
    this.joueur = new Player(name);
  }


  changeDifficulte(value : string) {
    this.choosedDifficulte = value;
    console.log("la diff : "+this.choosedDifficulte);
  }
}
