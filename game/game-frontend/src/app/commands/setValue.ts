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

    public override getUndoName(): string {
        return 'Défaire le coup';
    }




    public rootRenderer(): UndoableSnapshot {
        return setValue.getSnapshot(this.gameService.currentGame);
    }
    public override getVisualSnapshot(): Promise<HTMLElement> | HTMLElement | undefined {
        return setValue.getSnapshot(this.gameService.currentGame, this.index);
    }

    public static getSnapshot(game: Game, indexChanged?: number): HTMLImageElement {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d")!;
        const tileSize = 110;
        canvas.width = 1000;
        canvas.height = 1000;
        ctx.font = '100px Bodo';
        ctx.fillStyle = 'black';
        for (let i = 0; i < 81; i++) {
            ctx.fillText(game.grid.getTile(i).getValue?.toString() ?? "", (i % 9) * tileSize + 30, Math.floor(i / 9) * tileSize + 85);
        }
        for (let i = 1; i < 9; i++) {
            ctx.moveTo(i * tileSize, 0);
            ctx.lineTo(i * tileSize, canvas.height);
            ctx.moveTo(0, i * tileSize);
            ctx.lineTo(canvas.width, i * tileSize);
        }
        ctx.stroke(); // Draw the content
        const imgCache = new Image();
        imgCache.src = canvas.toDataURL("image/png");
        return imgCache;
    }
}