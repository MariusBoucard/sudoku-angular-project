export type PlayerDTO = {
    name : string
    score : number

}
/**
 * 
 * @param object JSON object we want to check
 * @returns un playerDTO si c est bien un playerDTO
 */
export function isPlayerDTO(object : any) : object is PlayerDTO {
  
    return object !== undefined 
        && typeof object.name === "string"
        && typeof object.score === "number";
       
}