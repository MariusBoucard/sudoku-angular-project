import {  Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs"; 
import { Grid } from '../classes/grid';
import { GridDTO, isGridDTO, isGridDTOArray } from '../DTO/grid-dto';
import { ClassementDTO, isClassementDTO } from '../DTO/classement-dto';

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
  
       

        
    /**
     * Je voulais faire ca avec des promises mais comme to promise est genre deprecié on l'a dans l'os
     * @param n 
     * @returns 
     */
    getGrid(n : number) {
      const res = this.http
        .get<GridDTO>("/api/sudokugrid/"+n)
        .pipe(map((res : GridDTO) => {
          console.log(res);
    
          if (isGridDTO(res)){
            console.log("recu a grille")
            return res;
          }else{
            throw new Error("Response is not a valid GameDTO array. Received :  " );
          }
    
          
        }))
      
      return res;
  
    }

    /**
     * 
     * @param n Potentiellement inutile donc j'ai pas encore fait dans le back
     * @returns 
     */

    getclassement(n : number) {
      const resu = this.http
        .get<ClassementDTO>("/api/getclassement")
        .pipe((ds ) => {
          if (isClassementDTO(ds)){
            console.log("c'est bien des gridsdto "+ds);
            return ds;
          }else{
            throw new Error("Response is not a valid GameDTO array. Received :  " + ds.toString());
          }
        });
      return resu;
    }
          

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
            
                  if (isGridDTOArray(res)){
                    console.log("c'est bien des gridsdto "+res);
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
  


