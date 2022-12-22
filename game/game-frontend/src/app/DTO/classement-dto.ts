import { Player } from "../classes/player";
import { isPlayerDTO } from "./player-dto";

export type ClassementDTO = {
    classement : Player[];
    

}

export function isClassementDTO(object : any) : object is ClassementDTO {
    return object !== undefined
        && Array.isArray(object.classement) && object.classement.every((el : any) => isPlayerDTO(el));
}