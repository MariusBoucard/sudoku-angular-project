import { Inject, Injectable } from "@angular/core";

@Injectable()
export class Player {
    name : String;
    /**
     * @Param : the score of the player is the number of
     * time he played.
     */
    score : number = 0;
    constructor(@Inject("defaultName") name:String ){
        this.name = name;
    }

    /**
     * Getter nom
     * @returns nom du joueur sous forme de string
     */
    getName():String{
        return this.name;
    }
    /**
     * getter score
     * @returns score du joueur sous forme de number
     */
    getScore():number{
        return this.score;
    }
    /**
     * setter nom
     * @param name nom qu'on veut définir au oueur
     */
    setName(name : String){
        this.name = name;
    }
    /**
     * setter score
     * @param score score qu'on veut lui attribuer
     */
    setScore(score : number){
        this.score= score;
    }
}
