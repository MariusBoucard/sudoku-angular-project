import { Injectable } from "@angular/core";
import { Difficulte } from "../enums/difficulte";
import { Classement } from "./classement";
import { Tile } from "./tile";

@Injectable({
    providedIn: 'root'
  })
export class Grid {

  id = 0;
  difficulte: Difficulte = 1;
  classement: Classement=new Classement();
  tileList: Tile[] = [];

  title = 'sudokugrid';

  selectedTabName = -1;

    constructor(){
      for (let i = 0; i < 81; i++) {

        this.tileList.push(new Tile());
      }
  
      for (let i = 0; i < 81; i++) {
  
        this.setValue(i, Math.floor(Math.random() * 9) + 1);
      }
      for (let i = 0; i < 81; i++) {
        this.tileList[i].constraintRespected = this.checkTile(i);
      }
      for (let i = 0; i < 81; i++) {
        this.updateSuggestedValues(i);
      }
  
      console.log("Grid created");
    }
  
    ngOnInit(): void {

   
  }
  getClassement(){
    return this.classement;
  }
  /**
   *
   * @param index is the position of the element in the fake array. Goes from 0 to 80
   * @returns An array [Column,line] representing the position of the element in a squared matrix
   */
  index_to_coordinates(index: number): number[] {
    const ligne = Math.floor(index / 9);
    const colonne = Math.floor(index % 9);
    return [colonne, ligne];
  }

  /**
   *
   * @param ligne current line in the sudoku grid
   * @param colonne current colonne in the sudoku grid (both parameter represents the coordinates)
   * @returns an index corresponding to the one needed to access to the data in TIleList.
   */
  coordinates_to_index(ligne: number, colonne: number): number {
    return Math.floor(ligne * 9 + colonne);
  }

  /**
   *
   * @param ligne line and colonne represents the coordinates of the displayed matrix for whom we wants to get the tile
   * @param colonne Column coordinate of the element we want to get
   * @returns return the Tile from TileList of coordinates corresponding to the one in entry
   */
  getTile(ligne: number, colonne: number): Tile {
    return this.tileList[this.coordinates_to_index(ligne, colonne)];
  }

  //Won't be implemented like that but we'll have to see how with history
  /**
   *
   * @param index index in the TileList of the Tile we want to set the value
   * This function do everything in this -> set the tile value, check if the constraint is still ok
   * and updates the suggestedValues
   * @param value Value we want to set to the tile
   */
  setValue(index: number, value: number) {

    this.tileList[index].value = value;
    this.tileList[index].constraintRespected = this.checkTile(index);
    // this.updateSuggestedValues(index);
  }

  /**
   * Check the validity of a tile, usefull for exemple after setting it's value
   * @param index index of the tile we want to check the validity
   * @returns boolean : true if everything's OK and False if something is wront
   */
  checkTile(index: number): boolean {
    return this.checkColumn(index) && this.checkLine(index) && this.checkSubGrid(index);
  }

  /**
   *
   * @param index index of the tile for which we want to check the validity at the column level
   * @returns boolean : true if it's ok, false either.
   */
  checkColumn(index: number): boolean {
    let resultat = true;
    const coord = this.index_to_coordinates(index);
    for (let i = 0; i < 9; i++) {
      if (this.tileList[i * 9 + coord[0]].value === this.tileList[index].value && (i * 9 + coord[0]) !== index) {
        resultat = false;
      }
    }

    return resultat;
  }

  /**
   *
   * @param index index of the tile for which we want to check the validity at the line level
   * @returns  boolean : true if it's ok, false eithexr.
   */
  checkLine(index: number): boolean {
    let resultat = true;
    const coord = this.index_to_coordinates(index);
    for (let i = 0; i < 9; i++) {
      if (this.tileList[i + coord[1] * 9].value === this.tileList[index].value && (i + coord[1] * 9) !== index) {
        resultat = false;
      }
    }

    return resultat;
  }

  /**
   *
   * @param index index of the tile for which we want to check the validity at the subgrid level
   * @returns  boolean : true if it's ok, false either.
   */
  checkSubGrid(index: number): boolean {
    let resultat = true;
    const coord = this.index_to_coordinates(index);
    let lignedepart = Math.floor(coord[1] / 3) * 3;
    let colonnedepart = Math.floor(coord[0] / 3) * 3;
    for (let ligne = lignedepart; ligne < lignedepart + 3; ligne++) {
      for (let col = colonnedepart; col < colonnedepart + 3; col++) {
        if (this.tileList[this.coordinates_to_index(ligne, col)].value === this.tileList[index].value && this.coordinates_to_index(ligne, col) !== index) {
          resultat = false;
        }
      }
    }
    return resultat;
  }

  /**
   *
   * @returns boolean saying if the game is finished (true if it is)
   */
  isFinished(): boolean {
    let resultat = true;
    for (let i = 0; i < 81; i++) {
      if (this.tileList[i].value === -1 || !this.tileList[i].constraintRespected) {
        resultat = false;
      }
    }
    return resultat;
  }

  /**
   * 
   * @param index index of the Tile we vant to know it's neighbours
   */
  indexSubGrid(index : number):number[]{
    let res = [];
    let coord=this.index_to_coordinates(index);
    let lignedepart = Math.floor(coord[1] / 3) * 3;
    let colonnedepart = Math.floor(coord[0] / 3) * 3;
    for (let ligne = lignedepart; ligne < lignedepart + 3; ligne++) {
      for (let col = colonnedepart; col < colonnedepart + 3; col++) {
        if(this.coordinates_to_index(ligne,col)!==index){

          res.push(this.coordinates_to_index(ligne,col));
        }
      }
    }
    
    return res;
  }
    /**
   * 
   * @param index index of the Tile we vant to know it's neighbours
   */
     indexLine(index : number):number[]{
      let res = [];
      let coord=this.index_to_coordinates(index);
      for (let i = 0; i < 9; i++) {
        if ((i + coord[1] * 9) !== index) {
          res.push(i + coord[1] * 9);
        }
      }
      return res;
    }
      /**
   * 
   * @param index index of the Tile we vant to know it's neighbours
   */
  indexColumn(index : number):number[]{
    let res = [];
    let coord=this.index_to_coordinates(index);
    for (let i = 0; i < 9; i++) {
      if ((i * 9 + coord[0]) !== index) {
        res.push((i * 9 + coord[0]));
      }
    }
    return res;
  }
  /**
   *
   * @param index index of the tile we just changed the value
   * This function aims to change the suggested values of all the Tiles that are influenced by the one
   * just played
   */
  updateSuggestedValues(index: number) {
    this.tileList[index].suggestedValues = this.getSuggestedValue(index);
    var subgridIndex = this.indexSubGrid(index);
    var lineIndex = this.indexLine(index);
    var columnIndex = this.indexColumn(index);
    subgridIndex.forEach(index => {this.tileList[index].suggestedValues = this.getSuggestedValue(index);});
    lineIndex.forEach(index => {this.tileList[index].suggestedValues = this.getSuggestedValue(index);});
    columnIndex.forEach(index => {this.tileList[index].suggestedValues = this.getSuggestedValue(index);});
    //Update les valeurs suggérées pour toute la colonne, pour toute la ligne pour tout le carré

  }

  /**
   * This function permit to determine the set of values we can play on a tile without making it false
   * @param index index of the tile for whom we want to update suggested values
   * @returns return the list of values we can play for this tile without making it false
   */
  getSuggestedValue(index: number): number[] {
    let retour = []
    const coord = this.index_to_coordinates(index);
    for (let i = 1; i < 10; i++) {
      let resultat = true;
      for (let col = 0; col < 9; col++) {
        if (this.tileList[col + coord[1] * 9].value === i && (col + coord[1]) !== index) {
          resultat = false;
          break;
        }
      }
      if (!resultat) {
        break;
      }
      for (let ligne = 0; ligne < 9; ligne++) {
        if (this.tileList[ligne * 9 + coord[0]].value === i && (ligne * 9 + coord[0]) !== index) {
          resultat = false;
          break;
        }
      }
      if (!resultat) {
        break;
      }
      for (let ligne = coord[1] / 3; ligne < 3; ligne++) {
        for (let col = coord[0] / 3; col < 3; col++) {
          if (this.tileList[this.coordinates_to_index(ligne, col)].value === i && this.coordinates_to_index(ligne, col) !== index) {
            resultat = false;
            break;
          }
        }
        if (!resultat) {
          break;
        }
      }
      if (resultat) {
        retour.push(i);
      }

    }
    return retour;
  }
}
