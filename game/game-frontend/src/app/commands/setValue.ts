import { Inject } from "@angular/core";
import { UndoableCommand, UndoableSnapshot } from "interacto";
import { Game } from "../classes/game";
import { GameService } from "../services/game.service";

export class setValue extends UndoableCommand {
    
    private oldValue!: number;
    private index!: number;
    public constructor(private tuileindex: number, private newValue: number,@Inject("gameServ") private gameService: GameService) {
        super();
        gameService.addScore();
      

    }

    /**
     * Genere la memoire qu'il faut pour pouvoir sauvegarder le coup
     */
    protected override createMemento(): void {
        this.oldValue = this.gameService.getValue(this.tuileindex);
        this.index = this.tuileindex;
    }

    /**
     * Lorsqu'on joue le coup c'est elle qui est appelée,
     * donc joue le coup quoiet update tout ce qui est remis en cause
     */
    protected execution(): void {
        if(this.newValue !== undefined){

            this.gameService.setValue(this.index, this.newValue);
            this.gameService.updateSuggestedValues();
            this.gameService.updateConstraintRespected();
            this.gameService.isGameFinished();
        }
        else {
            this.gameService.setValue(this.index, 0);

        }
    }

    /**
     * Lorsqu'on veut défaire la commande par appel de undo ou dans l'historique,
     * permet de regénérer les valeurs du momento
     */
    public undo(): void {
        this.gameService.setValue(this.index, this.oldValue);
        this.gameService.updateSuggestedValues();
            this.gameService.updateConstraintRespected();
            
    }

    /**
     * rappelle l execution
     */
    public redo(): void {
        this.execution();
    }
public override canExecute(): boolean {

        return this.gameService.currentGame.grid.getTile(this.tuileindex).getValue() !== this.newValue;
        }
    public override getUndoName(): string {
        return 'Défaire le coup';
    }




    /**
     * rendu originel
     *  */ 
    public rootRenderer(): UndoableSnapshot {
        return setValue.getSnapshot(this.gameService.currentGame);
        }
        /**
         * From le cours de Mr Blouin
         * @param game partie en cours
         * @param indexChanged tile qui a ete changée
         * @returns Une image qui sera dans interacto
         */
    public static getSnapshot(game: Game, indexChanged?: number): HTMLImageElement {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d")!;
        const tailleTuile=110;
        // Use the HTML Canvas API to fill the canvas, API examples:
        canvas.width = 1000;
        canvas.height = 1000;
        ctx.font = '100px Bodo';
        ctx.fillStyle = "red";
        for (let i = 0; i < game.grid.tileList.length; i++){
            if(game.grid.tileList[i]?.getValue()===0){
                ctx.fillText("", (i % 9) * tailleTuile + 30, Math.floor(i / 9) * tailleTuile + 85);
            } else {

                ctx.fillText(game.grid.tileList[i]?.getValue().toString() ?? "", (i % 9) * tailleTuile + 30, Math.floor(i / 9) * tailleTuile + 85);
            }
            }
            for(let i = 1; i < 9; i++) {
            ctx.moveTo(i * tailleTuile, 0);
            ctx.lineTo(i * tailleTuile, canvas.height);
            ctx.moveTo(0, i * tailleTuile);
            ctx.lineTo(canvas.width, i * tailleTuile);
            }
            ctx.stroke(); // Draw the content
            const imgCache = new Image();
            imgCache.src = canvas.toDataURL("image/png");
            return imgCache;
        }
        /**
         * 
         * @returns La petite image
         */
        public override getVisualSnapshot(): Promise<HTMLElement> | HTMLElement | undefined {
            return setValue.getSnapshot(this.gameService.currentGame, this.index);
            }
        
}