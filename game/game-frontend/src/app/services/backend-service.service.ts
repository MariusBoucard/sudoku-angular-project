import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs"; 
import { Grid } from '../classes/grid';

@Injectable({
  providedIn: 'root'
})
export class BackendServiceService {
 
    
  
  
    constructor(private http: HttpClient) {
    }
  
    generateGrid(level : String): Observable<Grid> {
   
        return this.http.get("/api/generategrid/"+level).
        pipe(
          map((gridJson: any) => {
            let grille : Grid = new Grid();
            grille.setID(gridJson.id);
            grille.setTiles(gridJson.values);
            grille.setClassement(gridJson.classement);
            grille.setDifficulty(gridJson.difficulte);
            return grille;
          }));
        ;}
  
        getAllGrids(): Observable<Grid[]> {
          return this.http.get<Grid[]>("/api/getgrids/").
          pipe(
            map((reponse: any) => {
              if(reponse){

                // return Grid.values(reponse); //This will return the array of object values.
              }
              return []; // If response is null return empty array for safety.
          }));
          
          ;}


          hello(): Observable<String> {
            console.log("caca");
            return this.http.get<String>("/api/").
            pipe(
              map((reponse: any) =>{ return reponse; // If response is null return empty array for safety.
            }));
            
            ;}
  

  }
  


