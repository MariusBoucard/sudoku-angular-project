import { Component, OnInit } from '@angular/core';
import { Player } from 'src/app/classes/player';

@Component({
  selector: 'app-classement',
  templateUrl: './classement.component.html',
  styleUrls: ['./classement.component.css']
})
export class ClassementComponent implements OnInit {
  classement : Player[] = [];
  constructor() { }

  ngOnInit(): void {
  }
  addToClassement(joueur : Player)
  {
    //TODO
  }

  getClassement(): Player[]{
    return this.classement;
  }

}
