import { Classement } from "../interfaces/classement"
import { Difficulte } from "../enums/difficulte"
import { Tile } from "../classes/tile"
import { isTileDTO } from "./tile-dto"
import { isClassementDTO } from "./classement-dto"



export type GridDTO = {
    id : number,
    classement : Classement,
    difficulte : Difficulte,
    values : Tile[]
    
}

/**
 * 
 * @param object Object to whom we check if he's the one
 * @returns 
 */
export function isGridDTO(object : any) : object is GridDTO {
    console.log("difficulte " +object.difficulte);
    return object !== undefined 
        && typeof object.id === "number"
        && isClassementDTO(object.classement)
       // && isDifficulteDTO(object.difficulte)
        && Array.isArray(object.values) && object.values.every((el : any) => isTileDTO(el));
}
/**
 * 
 * @param object Object to whom we check if he's the one
 * @returns 
 */
export function isGridDTO1(object : any) : object is GridDTO {
    console.log("difficulte " +object.difficulte);
    return object !== undefined 
        && typeof object.id === "number"
        //&& isClassementDTO(object.classement)
       // && isDifficulteDTO(object.difficulte)
        && Array.isArray(object.values) && object.values.every((el : any) => isTileDTO(el));
}
export function isGridDTO1Array(object : any) : object is Array<GridDTO> {
    return Array.isArray(object) && object.every(isGridDTO1);
}