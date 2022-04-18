import Board from "../engine/Board";
import {ILogMessage} from "../interfaces/ILogMessage";

export const responseObject = (message: string | number | null, board: Board, log: ILogMessage[] = []) => {
    const gameOver = board.isGameOver();
    let msg = message;
    if (gameOver) {
        const sysWinner = board.getWinner();
        const winner = sysWinner !== null ? sysWinner : 'NOBODY';
        if (winner == 'NOBODY') {
            msg = `--- DRAW ---`;
        } else {
            msg = `GAME OVER! ${winner} has won!`;
        }

    }
    return {
        message: msg,
        gameOver,
        grid: board.getBoardGrid(),
        log
    };
};
