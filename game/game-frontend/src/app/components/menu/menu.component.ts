import { Component, Inject, OnInit } from '@angular/core';
//import { Observable } from 'rxjs';
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
  IsChecked: boolean =  false;



  constructor(private backService : BackendServiceService,@Inject("gameServ") private gameService : GameService) {
    let that = this;
    this.backService.getAllGrids().subscribe({
      next(list) {that.Allgrids = list; that.failure = false;                 
    },
      error(err) {that.failure = true; console.error(err)}
    } );



  }
  /**
   * demande la génération d'une grille d'un niveau choisis par l'utilisateur, puis update
   * son affichage avec cette nouvelle grille quand elle est générée
   */
  generateGrid(){
    this.backService.generateGrid(this.choosedDifficulte).subscribe(gride =>{
        this.grille = gride;this.updateList(this.choosedDifficulte);
     })
    
  }
  /**
   * Genere un appel au back pour récupérer la liste de grille d un niveau choisis
   * @param val la difficulté qu'on a choisis et qui permettra d aller chercher dans le back la bonne liste de grilles
   */
  updateList(val : string){
    let that = this;
     this.backService.getLvlGrids(val).subscribe({
      next(list) {that.Allgrids = list; that.failure = false;                 
    },
      error(err) {that.failure = true; console.error(err);that.Allgrids = []; }
    } );;

  }


  
  ngOnInit(): void {

    this.fakeArray = new Array(81).fill(null).map((_, i) => i);

  }

/**
 * Permet de lancer une partie suite à un clique du joueur 
 * @param n id de la grille
 */
  launchGame(n : number){
    this.gameService.player = this.joueur;
    this.gameService.help=this.IsChecked;
    this.gameService.setGrid(n,this.joueur.getName());

  }
  /**
   * Permet de changer la valeur interne a la classe du nom de joueur
   * @param name nom du joueur à définir
   */
  setPlayer(name : String){
    this.joueur = new Player(name);
  }

/**
 * C'est un setter de parametre
 * @param value difficulté qu'on veut attribuer au paramêtre choosedDifficulte
 */
  changeDifficulte(value : string) {
    this.choosedDifficulte = value;
  }
}
