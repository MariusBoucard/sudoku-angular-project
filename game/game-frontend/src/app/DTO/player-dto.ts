export type PlayerDTO = {
    name : string
    score : number

}

export function isPlayerDTO(object : any) : object is PlayerDTO {
    console.log("Type du classement " +typeof object.classement);
    return object !== undefined 
        && typeof object.name === "string"
        && typeof object.score === "number"
       
}