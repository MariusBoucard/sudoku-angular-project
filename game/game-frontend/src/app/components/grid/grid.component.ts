import {Component, HostListener, Inject, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Bindings, PartialPointBinder, TreeUndoHistory, UndoableSnapshot } from 'interacto';
// import { PartialPointBinder } from 'interacto';
import {  PartialMatSelectBinder } from 'interacto-angular';
import { setValue } from 'src/app/commands/setValue';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],
})
/**
 * Component that display the grid
 */
export class GridComponent implements OnInit {
  //The inject is meant to use the same gameService for both gamecomponent and grid
  constructor(@Inject('gameServ')  public gameService : GameService,public History: TreeUndoHistory, public bindings: Bindings<TreeUndoHistory>,private route: ActivatedRoute){
  }
  @HostListener('contextmenu', ['$event'])
onRightClick(event: { preventDefault: () => void; }) {
  event.preventDefault();
}
idGrid : string | null | undefined;

  ngOnInit(){
    this.idGrid = this.route.snapshot.paramMap.get('idgrid');
    if( !Number.isNaN(Number(this.idGrid))){
      console.log("idGrid "+this.idGrid );
      this.gameService.setGridRefresh(Number(this.idGrid));
      //TODO -> Charger la grille via le back, mais on charge pas le player      
    }
  }
  indexArray = new Array(81).fill(null).map((_, i) => i);

  /**
   * Display function that permit to interact with user by changing the current hovered tile and to maybe add update later
   * @param tab index of the tile hovered
   */

  contraintRespected(index : number):boolean{
    return this.gameService.contraintRespected(index);

  }

/**
 * Quand on hover une case avec la souris on appelle  cette fonction pour que ca change
 * l'affichage
 * @param tab numero de la case survollée qu'il faut définir commme selected
 */
  hovered(tab: number) {
    this.gameService.setSelected(tab);
  }

  /**
   * This function aim to do the opposit thing than the previous on hovered
   * @param tab index of the tab we just quit with the mouse
   */
  unhovered(tab: number) {
    if (this.gameService.getSelected() === tab) {
      this.gameService.setSelected(-1);

    }

  }
  /**
   * getter classique 
   * @params index -> l'index ou on veut savoir la valeur
   * @returns la valeur à l index
   */
  getValue(index : number):number{
    return this.gameService.getValue(index);
  }
  /**
   * renvoi les valeurs suggérées à un certain endroit
   * @param index index ou on veut récuperer les valeurs suggérees
   * @returns un tableau de nombre suggéres
   */
  getSuggestedValues(index : number):number[]{
    return this.gameService.getSuggestedValue(index);
  }
  /**
   * 
   *getter standard pour savoir quelle case est survollée 
   a cet instant précis du temps ou on demande
   * @returns number de la case survollée
   */
  getSelected(n:number):number{
    return this.gameService.getSelected();
  }

  /**
   * @param n index in the tab
   * @returns return the css class to apply to the tile to make it really beautiful (Just joking bro)
   */
  getClass(n: number): String {
    let retour = "grid-item ";
    if (n === 80) {
      return retour;
    }

    if (((n + 1) % 3) === 0) {
      retour += ' lignedroite ';
    }
    if (((n) % 27) < 9) {
      retour += ' lignebas ';
    }
    return retour + "";

  }
/**
 * 
 * @param event C'est la key qui a été appuyée
 * car on voulait vraiment pouvoir set la valeur de la case a partir du
 * clavier num
 */
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
      if(this.gameService.getSelected() !== -1){
        if(Number(event.key)  )
        this.gameService.setValue(this.gameService.getSelected(),(event.key as unknown as number));
      }


  }
/**
 * Permet de générer des setValue et de les mettre dans l'historique 
 * grâce à la librairie Interacto
 * @param binder L'objet qui va faire l'appel, ici notre matselect
 * @param index numero de la case ou on doit setlavalue
 */
  public setValue(binder: PartialMatSelectBinder, index: number) {
    binder.toProduce(i => new setValue( index,i.change?.value ,this.gameService))
    .bind();
    }
/**
 * Met à jour les valeurs suggerees pour chacunes des cases
 */
    updateSuggestedvalues(){
      this.gameService.updateSuggestedValues();
    }

/**
 * Permet a l aide d un clique droit,
 * de mettre la premiere valeur suggéree dans la case
 * @param binder 
 * @param n le numero de case
 */
    public directSet(binder: PartialPointBinder,n : number) {
      binder
      .toProduce(() =>
      new setValue(n,this.gameService.getSuggestedValue(n)[0],this.gameService))
      .when(i => i.button === 2)
      .bind();
      }
      

   
        //From the help manual in moodle
        /**
         * permet de génerer la premiere image dans interacto
         * @returns 
         */
    rootRenderer(): UndoableSnapshot {
    return setValue.getSnapshot(this.gameService.currentGame);
  }
}
