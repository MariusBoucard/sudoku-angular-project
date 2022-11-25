import {  Injectable } from '@angular/core';
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
          return this.http.get<Grid[]>("/api/getallgrids").pipe(
            map(response =>{
              console.log("type get all grids "+typeof <Grid[]> response);
              return <Grid[]> response})) ;
        }

        
        
        getgrid(id : number) {
          console.log("We re sending request for grid N °"+id);
          return this.http.get("/api/sudokugrid/"+id).
          pipe(
            map((gridJson: any) => {
              let grille : Grid = new Grid();
              grille.setID(gridJson.id);
              grille.setTiles(gridJson.values);
              grille.setClassement(gridJson.classement);
              grille.setDifficulty(gridJson.difficulte);
              console.log(grille);
              return grille;
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
  


