import { IPlayer } from "../interfaces/IPlayer";
import { IGridCell } from "../interfaces/IGridCell";

export const getChainWinner = (chain: IGridCell[], minCountInARow: number): keyof IPlayer | null => {
    let isSameMarker: boolean = true;
    let marker = <keyof IPlayer | null>chain[0];
    let counter: number = 0;
    chain.map((cell: IGridCell) => {
        if (marker !== cell) isSameMarker = false;
        else counter++;
    });
    return isSameMarker && counter >= minCountInARow
        ? marker
        : null;
};
