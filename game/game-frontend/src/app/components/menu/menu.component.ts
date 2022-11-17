import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Grid } from 'src/app/classes/grid';
import { Player } from 'src/app/classes/player';
import { BackendServiceService } from 'src/app/services/backend-service.service';

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
  test : Observable<String> ;
  constructor(public backService:BackendServiceService) {
    this.backService.getAllGrids().subscribe(gridtab => { this.Allgrids = gridtab });
    console.log("test "+this.Allgrids);
    this.test = this.backService.hello();
   }
  
  ngOnInit(): void {

    this.fakeArray = new Array(81).fill(null).map((_, i) => i);
    console.log(this.test+"Test 2 ");

  }



  setPlayer(name : String){
    this.joueur = new Player(name);
  }
  generateGrid(){
    this.backService.generateGrid("easy").subscribe(a => this.grille = a);
    console.log("caca d"+this.grille.id);
  }
}
