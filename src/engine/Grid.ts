import { IGridCell } from "../interfaces/IGridCell";

function* row(size: number){
    yield new Array(size).fill(null);

}

export const gridGenerator = (size: number): IGridCell[][] => {
    const grid:IGridCell[][] | any = [];
    for( let i = 0; i < size; i++ ) {
        grid.push(row(size).next().value);
    }
    return grid;
};
