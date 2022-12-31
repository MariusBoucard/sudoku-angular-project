import { EventEmitter, Injectable } from '@angular/core';
import { Classement } from '../classes/classement';
import { Game } from '../classes/game';
import { Grid } from '../classes/grid';
import { Player } from '../classes/player';
import { Tile } from '../classes/tile';
import { GridDTO } from '../DTO/grid-dto';
import { BackendServiceService } from './backend-service.service';
import {ClassementComponent} from "../components/classement/classement.component";
import {MatDialog} from "@angular/material/dialog";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private grid : Grid,public player:Player,private backService : BackendServiceService, public dialog: MatDialog) {

   }

   help = false;
   gameEnded = false;
   currentGame : Game = new Game(this.grid,this.player);
   gameEndedValueChanges : EventEmitter<any> = new EventEmitter();
   ScoreValueChanges : EventEmitter<any> = new EventEmitter();


/**
 * Permet d initialiser les différents attributs en début de partie
 * grâce a ce qui a été recu du back
 * @param data Griddto recu du back
 */
   fillGame(data : GridDTO){
      this.currentGame.grid.id = data.id;
      this.currentGame.grid.classement.classement = [];
      data.classement.classement.forEach(player => {
        this.currentGame.grid.classement.addToClassement(player)
      });
      this.currentGame.grid.classement.classement.sort((a,b)=>a.score -b.score);
      console.log(this.currentGame.grid.classement.classement);
      let listnum = new Array(81);

      data.values.forEach((tile: Tile) => listnum.push(tile.value));

        this.currentGame.grid.setTiles(listnum);
        this.currentGame.grid.checkTiles();

   }

   /**
    * Cette fonction est appelée lorsque le joueur choisis sa grille,
    * elle fait une requête pour récupérer toutes les données dont le jeu a besoin pour commencer
    * puis charge les attributs de ce service à l'aide de ce qu'il a récup
    * @param n id de la grille
    * @param joueur nom du joueur qui commence la partie
    */
   setGrid(n:number,joueur: String){
    let play = new Player(joueur);
    this.backService.getGrid(n).subscribe(
      (data:any) => this.fillGame(data),
      (error: any) => console.log(error),
      () => console.log("completed")
    );

      this.currentGame.player = play;

    this.gameEnded = false;
   }

   /**
    * Lorsqu'on refresh une page on perd tout ce qui etait enregistre dans angular
    * ainsi on doit re requeter la grille et donner un nom par défaut
    * @param n
    */
   setGridRefresh(n:number){
    if(this.currentGame.player.name === "DeFauLtNaMe065345"){
      let play = new Player("Topin");
      this.backService.getGrid(n).subscribe(
        (data:any) => this.fillGame(data),
        (error: any) => console.log(error),
        () => console.log("completed")
      );

        this.currentGame.player = play;

      this.gameEnded = false;
    }
   }

   /**
    * Cette fonction permet de recalculer l'intégralité des valeurs suggérees sur toute la grille
    * elle est appelee à chaque coup
    */
   updateSuggestedValues(){
    for(let i =0;i<this.currentGame.grid.tileList.length;i++){
      this.currentGame.grid.tileList[i].suggestedValues = this.currentGame.grid.getSuggestedValue(i);
    }
   }
   /**
    * Cette focntion, qui jadis était très vulgaire, permet de tester si la partie est finie
    * @returns true si la partie est finie, de plus ca print un petit bail en console pour l'affirmer
    */
   isGameFinished():boolean{
    let check = true;
    for(let i =0;i<this.currentGame.grid.tileList.length;i++){
      if(this.currentGame.grid.tileList[i].constraintRespected === false ||this.currentGame.grid.tileList[i].getValue()<1 ){
        check = false;
        this.gameEnded =false;
        break;
      }
    }
    if(check){
      this.gameEnded =true;
      console.log("gamefinished oueoue")
      this.endGame();
      this.gameEndedValueChanges.emit(this.gameEndedValueChanges);
    }
    return check;
   }

   /**
    * Cette fonction verifie pour chaque case si les contraintes sont respectées, cela permet de mettre
    * en balance différentes options que seulement remettre en question notre dernier coup
    */
   updateConstraintRespected(){
    for(let i =0;i<this.currentGame.grid.tileList.length;i++){
      this.currentGame.grid.tileList[i].constraintRespected = this.currentGame.grid.checkTile(i);
    }
   }
   /**
    *
    * @returns le nom de la case selectionnée (hover)
    */
   getSelected():number{
    return this.currentGame.grid.selectedTabName;
   }
   /**
    * Cette fonction permet de savoir en temps réel quelle case est survollée
    * et ainsi d en changer la couleur
    * @param index index de la case actuellement hover
    */
   setSelected(index : number){
    this.currentGame.grid.selectedTabName=index;
   }
   /**
    * Getter standard u Know
    * @param index index de la case a laquelle on souhaite récupérer la valeur
    * @returns le nombre contenu dans la case
    */
   getValue(index : number):number{
    return this.currentGame.grid.tileList[index].value;
   }
   /**
    * Getter classico as usual
    * @param index index de la case dont on veut les valeurs suggerees
    * @returns un tableau des valeurs suggerees pour cette case
    */
   getSuggestedValue(index : number):number[]{
    return this.currentGame.grid.getSuggestedValue(index);
   }
   /**
    * getter again
    * @returns un objet de type classement qui est contenu dans la grille qui est contenu ici (on s'aggrege pas nous !!)
    */
   getClassement(): Classement {
      return this.currentGame.grid.getClassement();
   }
   /**
    * renvoi si la contrainte est respectée pour une certaine case
    * @param index de la case à verifier
    * @returns le boolean pour savoir si la contrainte est respectée : true si c est bon
    */
   contraintRespected(index : number):boolean{
    return this.currentGame.grid.tileList[index].constraintRespected;
   }
   /**
    * getter encore
    * @returns Le score du player (c est un number)
    */
   getScore():number{
    return this.currentGame.player.getScore();
   }
   /**
    * Si on veut tricher c est sympa, mais dans les faits pas utilisée
    * @param score le score qu'on veut attribuer au joueur
    */
   setScore(score : number){
    this.currentGame.player.setScore(score);
   }
   /**
    * emet un event pour dire que le score a ete changé,
    * et change le score -> appelée a chaque coup
    */
   addScore(){
    this.currentGame.player.score++;
    this.ScoreValueChanges.emit(this.ScoreValueChanges);

   }
  /**
   * non ce n'est pas le nom du dernier avengers, mais breel et bien la fonction qui
   * s'occupe de la fin de jeu !
   * ->elle demande un envoi du score du joueur actuel au backend si celui ci n'a pas été aidé
   */
   endGame(){
    if(!this.help){
      console.log("\n\n\n\n Envoi du score u know \n\n\n");
      this.backService.sendPlayer(this.currentGame.player,this.currentGame.grid.id);
    }
    else {
      console.log("on envoi pas le score car tu as triché bah ouais tu t attendais à quoi ?");
      //this.backService.sendPlayer(this.currentGame.player,this.currentGame.grid.id);
    }
    this.dialog.open(ClassementComponent, { disableClose: true });
   }

   /**
    * Setter pour permettre de jouer car on est la pour ça quand même
    * @param index INDEX DE la case dont on veut changer la valeur
    * @param valeur valeur qu'on veut lui attribuer
    */
   setValue(index : number,valeur:number){
    this.currentGame.grid.setValue(index,valeur);
   }

   /**
    * Getter encooore
    * @param index index de la tuile qu'on veut récupérer
    * @returns Un objet tile correspondant à ce qu'on veut récup
    */
   getTile(index : number):Tile{
    return this.currentGame.grid.getTile(index);
   }
}



