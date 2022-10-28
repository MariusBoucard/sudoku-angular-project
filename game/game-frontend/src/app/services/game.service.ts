import { Injectable } from '@angular/core';
import { Classement } from '../classes/classement';
import { Grid } from '../classes/grid';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private grid : Grid) {

   }

   getSelected():number{
    return this.grid.selectedTabName;
   }
   setSelected(index : number){
    this.grid.selectedTabName=index;
   }
   getValue(index : number):number{
    return this.grid.tileList[index].value;
   }
   getSuggestedValue(index : number):number[]{
    return this.grid.getSuggestedValue(index);
   }
   getClassement(): Classement {
      return this.grid.getClassement();
   }
   contraintRespected(index : number):boolean{
    return this.grid.tileList[index].constraintRespected;
   }
}

