import { gridGenerator } from "./Grid";
import { IPlayer } from "../interfaces/IPlayer";
import { IGridCell } from "../interfaces/IGridCell";
import Judge from "./Judge";
import { Player } from "../constants/Player";

class Board extends Judge {

    protected boardSize: number;

    protected boardGrid: IGridCell[][];

    protected lastTurnBy: keyof IPlayer | null = null;

    private message: string = 'X starts.';

    constructor(size: number = 3) {
        super();
        this.boardSize = size;
        this.boardGrid = gridGenerator(size);
    }

    public getBoardSize = (): number => this.boardSize;

    public getBoardGrid = (): IGridCell[][] => this.boardGrid;

    public setPlayerMark = (x: number, y: number, player: keyof IPlayer): void => {
        this.boardGrid[y][x] = <IGridCell>player;
        this.lastTurnBy = player;
    };

    public setMark = (x: number, y: number): boolean => {
        if (this.boardGrid[y][x] === null) {
            this.boardGrid[y][x] = <IGridCell>this.getWhosTurn();
            this.lastTurnBy = this.getWhosTurn();
            return true;
        }
        return false;
    };

    public getFreeTurnsCount = (): number => {
        let count: number = 0;
        this.boardGrid.map((r: IGridCell[]) => { count += r.filter((c: IGridCell) => c === null).length })
        return count;
    };

    public getWhosTurn = (): keyof IPlayer => {
        return this.lastTurnBy !== Player.X || this.lastTurnBy === null
            ? Player.X
            : Player.O;
    };

    public isGameOver = (): boolean => {
        return this.getWinner() !== null || this.getFreeTurnsCount() === 0;
    }

    public setMessage = (message: string): string => { this.message = message; return message; }

    public getMessage = () => this.message;

}

export default Board;