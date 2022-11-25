import { Component, Inject, OnInit } from '@angular/core';
// import { Observable } from 'rxjs';
import { Grid } from 'src/app/classes/grid';
import { Player } from 'src/app/classes/player';
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
  Allgrids : Grid[] =[];
  difficultes : String[] = ["eze","hard"]
  fakeArray: number[] = [];
  grille : Grid = new Grid();


  constructor(private backService : BackendServiceService,@Inject("gameServ") private gameService : GameService) {

    this.backService.getAllGrids().subscribe( gridtab=> { this.Allgrids = gridtab });

    console.log("test "+this.Allgrids);

  }
  
  generateGrid(){
    this.backService.generateGrid("easy").subscribe(gride =>{
        this.grille = gride;
        console.log("test "+this.Allgrids);

     });
    //TODO Ca m'a gavé on va faire avec des promises
  }

  getGrid(id :number){
    this.backService.getgrid(id).subscribe(res => {console.log(res);this.gameService.currentGame.grid = res;});

    console.log("test "+this.Allgrids);
    
    console.log("test 2 "+ typeof this.Allgrids[2]);
    
    console.log(this.gameService.currentGame.grid);
     
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


  lauchGame(){
    //TODO
    /**
     * Has to keep name in memory -> Saved in gameservice
     * inject gameservice des le debut ? Single instance ?
     */
  }
  setPlayer(name : String){
    this.joueur = new Player(name);
  }
}
