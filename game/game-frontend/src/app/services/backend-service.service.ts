import {  Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs"; 
import { Grid } from '../classes/grid';
import { GridDTO, isGridDTOArray } from '../DTO/grid-dto';

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
  


            getAllGrids() {

              const res = this.http
                .get<Array<GridDTO>>("/api/getallgrids")
                .pipe(map((res : Array<any>) => {
                  console.log(res);
            
                  if (isGridDTOArray(res)){
                    return res;
                  }else{
                    throw new Error("Response is not a valid GameDTO array. Received :  " + res.toString());
                  }
            
                  
                }))
              
              return res;
          
            }
 // getAllGrids(): Observable<Grid[]> {
        //   return this.http.get<Grid[]>("/api/getallgrids").pipe(
        //     map(response =>{
        //       console.log("type get all grids "+typeof <Grid[]> response);
        //       return <Grid[]> response})) ;
        // }
  }
  


