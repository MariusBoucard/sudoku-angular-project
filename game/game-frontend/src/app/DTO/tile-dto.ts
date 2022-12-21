export type TileDTO = {
    value : number
}

export function isTileDTO(object : any) : object is TileDTO {

    return object !== undefined 
        && typeof object.value === "number";
       
}