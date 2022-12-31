export type TileDTO = {
    value : number
}
/**
 * 
 * @param object une tile en json ou on veut test que c est bien une tile
 * @returns un TileDTO si c est une tile
 */
export function isTileDTO(object : any) : object is TileDTO {

    return object !== undefined 
        && typeof object.value === "number";
       
}