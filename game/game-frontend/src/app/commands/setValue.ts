import { UndoableCommand, UndoableSnapshot } from "interacto";
import { Game } from "../classes/game";
import { GameService } from "../services/game.service";

export class setValue extends UndoableCommand {
    
    private oldValue!: number;
    private index!: number;
    public constructor(private tuileindex: number, private newValue: number, private gameService: GameService) {
        super();
        console.log("A new setvalue ha been created" + this.newValue);
    }

    protected override createMemento(): void {
        this.oldValue = this.gameService.getValue(this.tuileindex);
        this.index = this.tuileindex;
    }

    protected execution(): void {
        //Issue new value is empty
        this.gameService.setValue(this.index, this.newValue);
    }

    public undo(): void {
        this.gameService.setValue(this.index, this.oldValue);
    }

    public redo(): void {
        this.execution();
    }
public override canExecute(): boolean {
        return this.gameService.currentGame.grid.getTile(this.index).getValue() !== this.newValue;
        }
    public override getUndoName(): string {
        return 'Défaire le coup';
    }




    public rootRenderer(): UndoableSnapshot {
        return setValue.getSnapshot(this.gameService.currentGame);
<<<<<<< HEAD
        }
=======
    }
    public override getVisualSnapshot(): Promise<HTMLElement> | HTMLElement | string|undefined {
        // return "coucou";
        return setValue.getSnapshot(this.gameService.currentGame, this.index);
    }

>>>>>>> 1a113cd9b3ac8f01e11babc8aed7387ee53b0ca4
    public static getSnapshot(game: Game, indexChanged?: number): HTMLImageElement {
        console.log("into getsnapshot u know");
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d")!;
        const tailleTuile=110;
        // Use the HTML Canvas API to fill the canvas, API examples:
        canvas.width = 1000;
        canvas.height = 1000;
        ctx.font = '100px Bodo';
<<<<<<< HEAD
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
=======
        ctx.fillStyle = 'black';
        for (let i = 0; i < 81; i++) {
            ctx.fillText(game.grid.getTile(i).getValue()?.toString() ?? "", (i % 9) * tileSize + 30, Math.floor(i / 9) * tileSize + 85);
>>>>>>> 1a113cd9b3ac8f01e11babc8aed7387ee53b0ca4
        }
        public override getVisualSnapshot(): Promise<HTMLElement> | HTMLElement | undefined {
            return setValue.getSnapshot(this.gameService.currentGame, this.index);
            }
        
}