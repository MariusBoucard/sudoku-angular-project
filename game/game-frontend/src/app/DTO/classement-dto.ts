import { Player } from "../classes/player";
import { isPlayerDTO } from "./player-dto";

export type ClassementDTO = {
    class : Player[],
    

}

export function isClassementDTO(object : any) : object is ClassementDTO {
    console.log("Type du classement " +typeof object.classement);
    return object !== undefined
        && Array.isArray(object.classement) && object.classement.every((el : any) => isPlayerDTO(el));
}