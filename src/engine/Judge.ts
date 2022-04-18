import { IPlayer } from "../interfaces/IPlayer";
import { IGridCell } from "../interfaces/IGridCell";
import {getChainWinner} from "./ChainChecker";

class Judge {

    protected boardGrid: IGridCell[][] = [];

    public getWinner = (): keyof IPlayer | null => {
        const wH = this.isHorizontalFilled();
        if (wH !== null) return wH;
        const wV = this.isVerticalFilled();
        if (wV !== null) return wV;
        const wDLR = this.isDiagonalLRFilled();
        if (wDLR !== null) return wDLR;
        const wDRL = this.isDiagonalRLFilled();
        if (wDRL !== null) return wDRL;
        return null;
    };

    private isHorizontalFilled = (): keyof IPlayer | null => {
        let winner:keyof IPlayer | null = null;
        for (let y = 0; y < this.boardGrid.length; y++) {
            let chain: IGridCell[] = [];
            for (let x = 0; x < this.boardGrid.length; x++) {
                chain.push( this.boardGrid[y][x] );
            }
            winner = getChainWinner(chain, this.boardGrid.length);
            if (winner !== null) return winner;
        }
        return winner;
    };

    private isVerticalFilled = (): keyof IPlayer | null => {
        let winner:keyof IPlayer | null = null;
        for (let x = 0; x < this.boardGrid.length; x++) {
            let chain: IGridCell[] = [];
            for (let y = 0; y < this.boardGrid.length; y++) {
                chain.push( this.boardGrid[y][x] );
            }
            winner = getChainWinner(chain, this.boardGrid.length);
            if (winner !== null) return winner;
        }
        return winner;
    };

    private isDiagonalLRFilled = (): keyof IPlayer | null => {
        let chain: IGridCell[] = [];
        for (let xy = 0; xy < this.boardGrid.length; xy++) {
            chain.push( this.boardGrid[xy][xy] );
        }
        return getChainWinner(chain, this.boardGrid.length);
    };

    private isDiagonalRLFilled = (): keyof IPlayer | null => {
        let chain: IGridCell[] = [];
        for (let xy = 0; xy < this.boardGrid.length; xy++) {
            chain.push( this.boardGrid[xy][this.boardGrid.length - 1 - xy] );
        }
        return getChainWinner(chain, this.boardGrid.length);
    };

}

export default Judge;
