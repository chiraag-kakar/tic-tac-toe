import { IPlayer } from "./IPlayer";

export interface IGridCell {
    [key: number]: keyof IPlayer | null
}