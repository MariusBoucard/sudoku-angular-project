import { Component, OnInit } from '@angular/core';
import { Tile } from 'src/app/classes/tile';
import { Difficulte } from 'src/app/enums/difficulte';
import { ClassementComponent } from '../classement/classement.component';
@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  id = 0;
  difficulte: Difficulte = 1;
  Classement: ClassementComponent | undefined;
  TileList: Tile[] = [];

  title = 'sudokugrid';

  selectedTabName = 0;
  fakeArray = new Array(81).fill(0).map((i, idx) => idx + 1);

  ngOnInit(): void {

    for (var i = 0; i < 81; i++) {

      this.TileList.push(new Tile(Math.floor(Math.random() * 9) + 1));
    }

    for (var i = 0; i < 81; i++) {

      this.setValue(i,Math.floor(Math.random() * 9) + 1);
    }
  }


  index_to_coordinates(index: number): number[] {
    var ligne = index / 9;
    var colonne = index % 9;
    return [colonne, ligne];
  }

  coordinates_to_index(ligne: number, colonne: number): number {
    return ligne * 9 + colonne;
  }

  getTile(ligne: number, colonne: number): Tile {
    return this.TileList[this.coordinates_to_index(ligne, colonne)];
  }

  //Won't be implemented like that but we'll have to see how with history
  setValue(index: number, value: number) {

    this.TileList[index].value = value;
    this.TileList[index].constraintRespected = this.checkTile(index);
    this.updateSuggestedValues(index);
  }

  checkTile(index: number): boolean {
    return this.checkColumn(index) && this.checkLine(index) && this.checkSubGrid(index);
  }


  checkColumn(index: number): boolean {
    var resultat = true;
    var coord = this.index_to_coordinates(index);
    for (var i = 0; i < 9; i++) {
      if (this.TileList[i * 9 + coord[0]].value === this.TileList[index].value && (i * 9 + coord[0]) !== index) {
        resultat = false;
      }
    }

    return resultat;
  }

  checkLine(index: number): boolean {
    var resultat = true;
    var coord = this.index_to_coordinates(index);
    for (var i = 0; i < 9; i++) {
      if (this.TileList[i + coord[1] * 9].value === this.TileList[index].value && (i + coord[1]) !== index) {
        resultat = false;
      }
    }

    return resultat;
  }

  checkSubGrid(index: number): boolean {
    var resultat = true;
    var coord = this.index_to_coordinates(index);
    for (var ligne = coord[1] / 3; ligne < 3; ligne++) {
      for (var col = coord[0] / 3; col < 3; col++) {
        if (this.TileList[this.coordinates_to_index(ligne, col)].value === this.TileList[index].value && this.coordinates_to_index(ligne, col) !== index) {
          resultat = false;
        }
      }
    }
    return resultat;
  }
  isFinished(): boolean {
    var resultat = true;
    for (var i = 0; i < 81; i++) {
      if (this.TileList[i].value === -1 || this.TileList[i].constraintRespected === false) {
        resultat = false;
      }
    }
    return resultat;
  }

  updateSuggestedValues(index: number) {
    //Update les valeurs suggérées pour toute la colonne, pour toute la ligne pour tout le carré

  }

  getSuggestedValue(index: number): number[] {
    var retour = []
    var coord = this.index_to_coordinates(index);
    for (var i = 1; i < 10; i++) {
      var resultat = true;
      for (var col = 0; col < 9; col++) {
        if (this.TileList[i + coord[1] * 9].value === i && (i + coord[1]) !== index) {
          resultat = false;
        }
      }
      for (var ligne = 0; ligne < 9; ligne++) {
        if (this.TileList[i * 9 + coord[0]].value === i && (i * 9 + coord[0]) !== index) {
          resultat = false;
        }
      }
      for (ligne = coord[1] / 3; ligne < 3; ligne++) {
        for (col = coord[0] / 3; col < 3; col++) {
          if (this.TileList[this.coordinates_to_index(ligne, col)].value === i && this.coordinates_to_index(ligne, col) !== index) {
            resultat = false;
          }
        }
      }
      if (resultat) {
        retour.push(i);
      }

    }
    return retour;
  }

  hovered(tab: number) {
    this.selectedTabName = tab;
    var coord = this.index_to_coordinates(tab);
    console.log("Hovered coords" + coord);
  }
  unhovered(tab: number) {
    if (this.selectedTabName === tab) {
      this.selectedTabName = 0;
    }

  }
}
