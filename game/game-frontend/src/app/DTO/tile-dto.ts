export type TileDTO = {
    value : number
}

export function isTileDTO(object : any) : object is TileDTO {
    console.log("Type du classement " +typeof object.classement);
    return object !== undefined 
        && typeof object.value === "number"
       
}