import { Component, OnInit } from '@angular/core';

// import { from } from 'rxjs';

@Component({
  selector: 'app-grid-matrix',
  templateUrl: './grid-matrix.component.html',
  styleUrls: ['./grid-matrix.component.css']
})
export class GridMatrixComponent implements OnInit {
  
  title = 'sudokugrid';
  selectedTabName=0;
  tab="";
  valueMatrix : number[][]= [];
  errorArray = new Array(81).fill(false);
  fakeArray = new Array(81).fill(0).map((i, idx) => idx + 1);
 
  ngOnInit(): void {

    for(var i =0;i<9;i++){
      this.valueMatrix.push([]);
    }

    for(var i=0;i<9;i++){
      for(var j =0;j<9;j++){
        this.valueMatrix[i][j]=0;
      }
    }

    this.fillDiag();
    this.fillRest(0,9);
    console.log("error "+this.errorArray);

    for(var i =0;i<9;i++){
      for(var j=0;j<9;j++){
        this.isRight([i,j],this.valueMatrix[i][j]);
      }
    }
    // this.removeSome();
  }
  


    fillRest(i : number,j:number)
    {
      //  System.out.println(i+" "+j);
        //PASSAGE A LA LIGNE SUIVANTE
        if (j>=9 && i<9-1)
        {
            i = i + 1;
            j = 0;
        }
        //si sorti de la matrice
        if (i>=9 && j>=9)
            return true;
        
        
        if (i < 3)
        {
            //Si premier carré
            if (j < 3)
                j = 3;
        }
        
        else if (i < 6)
        {
            //si kré milieu
            if (j==Math.floor((i/3)*3))
                j =  j + 3;
        }
        else
        {   //check si pas dernier carré
            if (j == 6)
            {
                i = i + 1;
                j = 0;
                if (i>=9)
                    return true;
            }
        }
 
        for (var num = 1; num<=9; num++)
        {
            if (this.dispoBox(i, j, num)&&this.checkLineInit([i,j],num)&&this.checkColumnInit([i,j],num))
            {
                this.valueMatrix[i][j] = num;
                //Si on peut mettre cette valeur, on la met et appelle recursivement pour faire toute la grille
                if (this.fillRest(i, j+1))
                    return true;
                //si cette valeur la de case etait pas possible alors elle est mise à 0 et on va tester pour les autres valeurs,
                //car c'était peut etre possible sur le papier mais ensuite ca a abouti à une fausse route.
                this.valueMatrix[i][j] = 0;
            }
        }
        return false;
    }
    
    
    
    fillDiag(){
      for(var i=0;i<3;i++){
        console.log("i value :"+i);
        console.log(this.valueMatrix);
        this.fillBlock(i*3,i*3);
      }
      console.log(this.valueMatrix);//Le remplissage chiais
    }
    
    dispoBox(ligne:number,colonne:number,nombre : number){
      for(var i =0;i<3;i++){
        for(var j =0;j<3;j++){
          if(this.valueMatrix[ligne+i][colonne+j]===nombre){
            return false;
          }
        }
      }
      console.log(nombre+" est dispo en "+ligne+","+colonne);
      return true;
      
    }

    fillBlock(ligne:number,colonne:number){
        var numero = this.getRandomId();
        console.log("Fillblock : "+ligne+","+colonne);//great
        console.log(this.valueMatrix);

        for(var i =0;i<3;i++){
          for(var j =0;j<3;j++){
            while(!(this.dispoBox(ligne,colonne,numero))){
              numero = this.getRandomId();
            }
            var y=ligne+i;
            var x = colonne+j;
            console.log("ancienne valeur de "+y+", "+x+" : "+this.valueMatrix[y][x]);
            console.log(numero);
            this.valueMatrix[y][x] = numero;
            console.log("nouvelle valeur de "+y+", "+x+" : "+this.valueMatrix[y][x]);
            }
          }
    }


getValueFromId(id : number){
  var coordinates = this.coordinatesFromIndice(id);
  return this.valueMatrix[coordinates[0]][coordinates[1]];
}

getValue(coordinates : number[]){
  return this.valueMatrix[coordinates[0]][coordinates[1]];
}

coordinatesFromIndice(id : number){
  id;
  var colonne:number = (id-1)%9;
  var ligne:number = Math.trunc(id/9-0.002);
  
  return [ligne,colonne];
}

isRight(coordo : number[], value : number){
  if(value>9 || value <1){
    this.errorArray[coordo[0]*9+coordo[1]]=true;
    return;
  }
  

  if(this.checkLine(coordo,value) &&this.checkColumn(coordo,value) ){
    console.log("celui la est bon ligne :"+coordo);
    this.errorArray[coordo[0]*9+coordo[1]]=false;
    return true;
  }
 
  else{
    this.errorArray[coordo[0]*9+coordo[1]]=true;
    return false;
  }
}


checkLineInit(coordinates : number[],value:number){
  var vu = 0;
    for(var i=0;i<9;i++){
        if(this.valueMatrix[coordinates[0]][i]===value){
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
  for(var i=0;i<9;i++){
      if(this.valueMatrix[i][coordinates[1]]===value){
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
  console.log("valeur de la case"+value);
    for(var i=0;i<9;i++){
        if(this.valueMatrix[coordinates[0]][i]===value){
          vu++;
        }
    }
    if(vu<2){
      return true;
    }
    else{
      return false;
    }
}
checkColumn(coordinates : number[],value : number){
  var vu = 0;
  for(var i=0;i<9;i++){
      if(this.valueMatrix[i][coordinates[1]]===value){
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
  var coord = this.coordinatesFromIndice(tab);
  console.log("Hovered coords"+coord);
  this.isRight(coord,this.valueMatrix[coord[0]][coord[1]]);
}
unhovered(tab : number) {
  if(this.selectedTabName === tab){
    this.selectedTabName =0;
  }
  
}




}
