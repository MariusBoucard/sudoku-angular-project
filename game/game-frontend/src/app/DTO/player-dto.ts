export type PlayerDTO = {
    name : string
    score : number

}

export function isPlayerDTO(object : any) : object is PlayerDTO {
  
    return object !== undefined 
        && typeof object.name === "string"
        && typeof object.score === "number";
       
}