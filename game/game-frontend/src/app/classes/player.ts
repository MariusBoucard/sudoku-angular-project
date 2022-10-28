

export class Player {
    name : String;
    /**
     * @Param : the score of the player is the number of
     * time he played.
     */
    score : number = 0;
    constructor(name:String = ""){
        this.name = name;
    }

    getName():String{
        return this.name;
    }
    getScore():number{
        return this.score;
    }
    setName(name : String){
        this.name = name;
    }
    setScore(score : number){
        this.score= score;
    }
}
