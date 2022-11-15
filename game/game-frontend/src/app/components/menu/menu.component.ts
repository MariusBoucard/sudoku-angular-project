import { Component, OnInit } from '@angular/core';
import { Grid } from 'src/app/classes/grid';
import { Player } from 'src/app/classes/player';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  joueur : Player = new Player('Topin');
  Allgrids : Grid[] = [];
  difficultes : String[] = ["eze","hard"]
  fakeArray: number[] = [];
  constructor() { }

  ngOnInit(): void {
    let a = new Grid();
    this.Allgrids.push(a);
    this.fakeArray = new Array(81).fill(null).map((_, i) => i);
  }



  setPlayer(name : String){
    this.joueur = new Player(name);
  }
}
