import { UndoableCommand, UndoableSnapshot } from "interacto";
import { Game } from "../classes/game";
import { GameService } from "../services/game.service";

export class setValue extends UndoableCommand {
    
    private oldValue!: number;
    private index!: number;
    public constructor(private tuileindex: number, private newValue: number, private gameService: GameService) {
        super();
        gameService.addScore();
        gameService.updateSuggestedValues();
        gameService.isGameFinished();
        
    }

    protected override createMemento(): void {
        this.oldValue = this.gameService.getValue(this.tuileindex);
        this.index = this.tuileindex;
        console.log("tuileindex"+this.index);
    }

    protected execution(): void {
        //Issue new value is empty
        if(this.newValue !== undefined){

            this.gameService.setValue(this.index, this.newValue);
        }
        else {
            this.gameService.setValue(this.index, 0);

        }
    }

    public undo(): void {
        this.gameService.setValue(this.index, this.oldValue);
    }

    public redo(): void {
        this.execution();
    }
public override canExecute(): boolean {
    console.log(this.index);

        return this.gameService.currentGame.grid.getTile(this.tuileindex).getValue() !== this.newValue;
        }
    public override getUndoName(): string {
        return 'Défaire le coup';
    }




    public rootRenderer(): UndoableSnapshot {
        return setValue.getSnapshot(this.gameService.currentGame);
        }
    public static getSnapshot(game: Game, indexChanged?: number): HTMLImageElement {
        console.log("into getsnapshot u know");
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d")!;
        const tailleTuile=110;
        // Use the HTML Canvas API to fill the canvas, API examples:
        canvas.width = 1000;
        canvas.height = 1000;
        ctx.font = '100px Bodo';
        ctx.fillStyle = "red";
        for (let i = 0; i < game.grid.tileList.length; i++){
            ctx.fillText(game.grid.tileList[i]?.getValue().toString() ?? "", (i % 9) * tailleTuile + 30, Math.floor(i / 9) * tailleTuile + 85);
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
        public override getVisualSnapshot(): Promise<HTMLElement> | HTMLElement | undefined {
            return setValue.getSnapshot(this.gameService.currentGame, this.index);
            }
        
}