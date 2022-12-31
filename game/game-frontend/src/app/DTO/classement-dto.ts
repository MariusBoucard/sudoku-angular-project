import { Player } from "../classes/player";
import { isPlayerDTO } from "./player-dto";

export type ClassementDTO = {
    classement : Player[];
    

}
/**
 * 
 * @param object Un json qu'on veut tester
 * @returns un classement si cet objet json correspond à notre définition d un classement.
 */
export function isClassementDTO(object : any) : object is ClassementDTO {
    return object !== undefined
        && Array.isArray(object.classement) && object.classement.every((el : any) => isPlayerDTO(el));
}