import { Component, OnInit } from '@angular/core';
// import { from } from 'rxjs';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
 
  ngOnInit(): void {
    
      
    // var num:number = 0; 
    // var i:number; 
    // var j:number;
    // var lignes =9;
    // var colonnes = 9;
   

    // for(var a=0;a<81;a++){
    //   var dejapris = [-1];
    //   var coordo = this.coordinatesFromIndice(a);
    //   for(var k=1;k<10;k++){

    //     if(!this.checkLineInit(coordo,k) || !this.checkColumnInit(coordo,k)){
    //         dejapris.push(k);
    //     }

    //   }
     
    //   this.valueArray[a]=this.getRandom(dejapris,coordo);
    //   var caca= "deja pris - case ["+coordo[0]+","+coordo[1]+"]"+" : "+dejapris;
    //   console.log(caca);
    // }
    var allValues =[-1,1,2,3,4,5,6,7,8,9];
    var round=0;

    //POSSIBILIT2 D IMPL CA EN FCT LOGIQUE
    for(var i=0;i<9;i++){
      for(var j=0;j<9;j++){
        var coordo = [i,j];
        var dejapris = [-1];
        for(var k=1;k<10;k++){
          if(!this.checkLineInit(coordo,k)){
              dejapris.push(k);
          }
          if(!this.checkColumnInit(coordo,k)){
            dejapris.push(k);
          }
       
        }
        let missing = allValues.filter(item => dejapris.indexOf(item) < 0);
        var caca2= "deja pris - case ["+coordo[0]+","+coordo[1]+"]"+" : "+dejapris;
        var caca= "MISSING - case ["+coordo[0]+","+coordo[1]+"]"+" : "+missing;

        console.log(caca2);
        console.log(caca);

        if(missing.length===0){
          round++;
          if((round<11)){
            j=0;
          }
          else{
            this.valueArray[i*9+j]=this.getRandom(dejapris,coordo);

            break;
          }
          
          
        }
        this.valueArray[i*9+j]=this.getRandom(dejapris,coordo);


      }
    }


      // var a : number;
      // for(i = num;i<81;i++) {
      //   for(a=num;a<10;a++){
      //     if(!this.isRight(i,this.valueArray[i])){

      //       this.valueArray[i]=this.getRandomId();
      //     }
      //     else{break;}
      //   }
      //  }
      
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
// columnCheck(i: number,j:number,n:number){
//   //i line
//   //j column
//   for(var z =0;z<i;z++){
//     if(this.valueArray[i*9+j]===n){
//       return false;
//     }
//   }
//   return true;
// }
coordinatesFromIndice(id : number){
  id++;
  var colonne:number = (id-1)%9;
  // if(id===80){
  //   colonne=8;
  // }
  // if(colonne===-1){
  //   colonne =0;
  // }
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

checkLineInit(coordinates : number[],value:number){
  var vu = 0;
    for(var i=coordinates[0]*9;i<(coordinates[0]*9+coordinates[1]);i++){
        if(this.valueArray[i]===value){
          vu++;
        }
    }
    if(vu===0){
      return true;
    }
    else{
      return false;
    }
}
checkColumnInit(coordinates : number[],value : number){
  var vu = 0;
  for(var i=coordinates[1];i<81;i+=9){
      if(this.valueArray[i]===value){
        vu++;
      }
  }
  if(vu===0){
    return true;
  }
  else{return false;}
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
getRandom(ca : number[],coord : number[]) {
  var randTmp = Math.floor((Math.random()*9)+1);
  for(var i = 0; i<1000;i++){
    if(ca.includes(randTmp)){
      randTmp  = Math.floor((Math.random()*9)+1);

    }
    else{break;}
  }
  if(ca.includes(randTmp)){
  console.log("way to much shit in : "+coord);
  }
  // while(ca.includes(randTmp)){
  //   randTmp  = Math.floor((Math.random()*9)+1);
  // }
  return randTmp;
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
