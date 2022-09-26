import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  ngOnInit(): void {
    
      
    var num:number = 0; 
    var i:number; 

      for(i = num;i<81;i++) {
        //this.valueArray[i]= i;
        this.valueArray[i]=this.getRandomId();
      }
      var a : number;
      for(i = num;i<81;i++) {
        for(a=num;a<10;a++){
          if(!this.isRight(i,this.valueArray[i])){
            this.valueArray[i]=this.getRandomId();
          }
          else{break;}
        }
    }
      
  }


title = 'sudokugrid';
selectedTabName=0;
tab="";
errorArray = new Array(81).fill(false);
valueArray = new Array(81);
fakeArray = new Array(81).fill(0).map((i, idx) => idx + 1);

getValue(n : number){
  return this.valueArray[n-1];
}

coordinatesFromIndice(id : number){
  var colonne:number = (id-1)%9;
  var ligne:number = Math.trunc(id/9-0.002);
  console.log(ligne);
  console.log(colonne);
  return [ligne,colonne];

}

isRight(id : number, value : number){
  if(value>9 || value <1){
    this.errorArray[id]=true;
    return;
  }
  var coordinates = this.coordinatesFromIndice(id);

  if(this.checkLine(coordinates,value) && this.checkColumn(coordinates,value)){
    this.errorArray[id]=false;
    return true;
  }
  else{
    this.errorArray[id]=true;
    return false;
  }
}

checkLine(coordinates : number[],value:number){
  var vu = 0;
    for(var i=coordinates[0]*9;i<(coordinates[0]+1)*9;i++){
        if(this.valueArray[i]===value){
          vu++;
        }
    }
    if(vu<2){
      return true;
    }
    else{return false;}
}
checkColumn(coordinates : number[],value : number){
  var vu = 0;
  for(var i=coordinates[1];i<81;i+=9){
      if(this.valueArray[i]===value){
        vu++;
      }
  }
  if(vu<2){
    return true;
  }
  else{return false;}
}
getRandomId() {
  return Math.floor((Math.random()*9)+1);
}
hovered(tab : number) {
  this.selectedTabName = tab;
  this.isRight(tab,this.valueArray[tab]);
}
unhovered(tab : number) {
  if(this.selectedTabName === tab){
    this.selectedTabName =0;
  }
  
}




}
