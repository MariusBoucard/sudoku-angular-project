import { Classement } from "../classes/classement";
import { Difficulte } from "../enums/difficulte";

export interface Grid {
    id : number;
    classement : Classement;
    difficulte : Difficulte;
    values : number[];
}
