import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { Grid } from '../classes/grid';
import { GridDTO, isGridDTO, isGridDTO1Array } from '../DTO/grid-dto';
import { ClassementDTO, isClassementDTO } from '../DTO/classement-dto';
import { Player } from '../classes/player';

@Injectable({
  providedIn: 'root'
})
export class BackendServiceService {




  constructor(private http: HttpClient) {
  }

  /**
   * 
   * @param level level of the grid we want to generate
   * @returns un observable de grille pour pouvoir jouer avec, mais en screed, il sert a rien car on lance pas direct la partie
   */
  generateGrid(level: String): Observable<Grid> {

    return this.http.get("/api/generategrid/" + level).
      pipe(
        map((gridJson: any) => {
          let grille: Grid = new Grid();
          grille.setID(gridJson.id);
          grille.setTiles(gridJson.values);
          grille.setClassement(gridJson.classement);
          grille.setDifficulty(gridJson.difficulte);
          return grille;
        }));
    ;
  }




  /**
   * Je voulais faire ca avec des promises mais comme to promise est genre deprecié on l'a dans l'os
   * @param n 
   * @returns 
   */
  getGrid(n: number) {
    const res = this.http
      .get<GridDTO>("/api/sudokugrid/" + n)
      .pipe(map((res: GridDTO) => {

        if (isGridDTO(res)) {
          console.log("yeah it s a grid");
          return res;
        } else {
          throw new Error("Response is not a valid GameDTO array. Received :  ");
        }


      }))

    return res;

  }

  /**
   * SERT A RIEN, ATTENTION MSERT A RIEN
   * @param n Potentiellement inutile donc j'ai pas encore fait dans le back
   * @returns 
   */

  getclassement(n: number) {
    const resu = this.http
      .get<ClassementDTO>("/api/getclassement")
      .pipe((ds) => {
        if (isClassementDTO(ds)) {
          return ds;
        } else {
          throw new Error("Response is not a valid GameDTO array. Received :  " + ds.toString());
        }
      });
    return resu;
  }

/**
 * Classic hello word to test backend
 * @returns un string mais pas celui de Kim k
 */
  hello(): Observable<String> {
    return this.http.get<String>("/api/").
      pipe(
        map((reponse: any) => {
          return reponse; // If response is null return empty array for safety.
        }));

    ;
  }
/**
 * Attention quand meme cette fonction va chercher des DTO, y a pas le classement dedans
 * @param difficulte une string correspondant à celles déja défini (dans l'enum for exemple) permettant de choisir la diff des grilles qu'on veut choper
 * @returns l ensemble des grilles du niveau concerné (enfin un bon observable des familles)
 */
  getLvlGrids(difficulte : string){
    const res = this.http
    .get<Array<GridDTO>>("/api/sudokulist/"+difficulte)
    .pipe(map((res: Array<any>) => {

      if (isGridDTO1Array(res)) {
        return res;
      } else {
        throw new Error("Response is not a valid GameDTO array. Received :  " + res.toString());
      }


    }))

  return res;
  }
/**
 * Cette fonction va chercher tous les DTO de grille dans le back
 * @returns toutes les grilles déja générées dans le back -> C'est des DTO sazns classement pour le menu
 */
  getAllGrids() {

    const res = this.http
      .get<Array<GridDTO>>("/api/getallgrids")
      .pipe(map((res: Array<any>) => {

        if (isGridDTO1Array(res)) {
          return res;
        } else {
          throw new Error("Response is not a valid GameDTO array. Received :  " + res.toString());
        }


      }))

    return res;

  }
/**
 * Cette fonction est appelée pour envoyer un joueur dans le classement d une partie en fin de celle ci
 * @param player joueur qu'on veut envoyer
 * @param id id de la grille à laquelle il vient de jouer
 * @returns c est un post donc en gros un oui c est passé quoi
 */
  sendPlayer(player: Player, id: number) {
    // const body=JSON.stringify(player);

    //const headers = { 'content-type': 'application/json'}  
    const res = this.http.post<Player>("/api/addscore/" + id, player);
    res.subscribe();
    return res;
  }
 
}



