export type PlayerDTO = {
    name : string
    score : number

}

export function isPlayerDTO(object : any) : object is PlayerDTO {
    console.log("Type du player"+object);
    console.log(object !== undefined 
        && typeof object.name === "string"
        && typeof object.score === "number");
    return object !== undefined 
        && typeof object.name === "string"
        && typeof object.score === "number";
       
}