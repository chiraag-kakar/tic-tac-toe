import { default as Board } from './Board';
import { describe, it } from "mocha";
import * as assert from "assert";
import { Player } from "../constants/Player";

describe('Board', () => {

    it('has default size 3', () => {
        const board = new Board();
        assert.strictEqual(board.getBoardSize(), 3, 'Default board initialized size is 3');
    });

    it('returns size same as given in constructor', () => {
        const board = new Board(6);
        assert.strictEqual(board.getBoardSize(), 6, 'Constructed board with 6 returns size 6');
    });

    it('default initialization should generate grid 3x3', () => {
        const board = new Board();
        const grid = board.getBoardGrid();
        assert.strictEqual(grid.length, 3, 'Grid has 3 rows');
        assert.strictEqual(grid[0].length, 3, 'Grid first line has 3 columns');
    });

    it('should be possible to set player mark on a board at given coordinates', () => {
        const board = new Board();
        board.setPlayerMark(0, 0, Player.X);
        board.setPlayerMark(2, 1, Player.O);
        console.log(board.getBoardGrid());
        assert.strictEqual(board.getBoardGrid()[0][0], Player.X, 'X:0; Y:0 is marked as X');
        assert.strictEqual(board.getBoardGrid()[1][2], Player.O, 'X:2; Y:1 is marked as O');
    });

    it('X should win on default 3x3 board vertically', () => {
        const board = new Board();
        board.setPlayerMark(0, 0, Player.X);
        board.setPlayerMark(0, 1, Player.X);
        board.setPlayerMark(0, 2, Player.X);
        console.log(board.getBoardGrid());
        assert.strictEqual(board.getWinner(), Player.X, 'X won vertically!');
    });

    it('X should win on default 3x3 board horizontally', () => {
        const board = new Board();
        board.setPlayerMark(0, 0, Player.X);
        board.setPlayerMark(1, 0, Player.X);
        board.setPlayerMark(2, 0, Player.X);
        console.log(board.getBoardGrid());
        assert.strictEqual(board.getWinner(), Player.X, 'X won horizontally!');
    });

    it('X should win on default 3x3 board diagonally L->R', () => {
        const board = new Board();
        board.setPlayerMark(0, 0, Player.X);
        board.setPlayerMark(1, 1, Player.X);
        board.setPlayerMark(2, 2, Player.X);
        console.log(board.getBoardGrid());
        assert.strictEqual(board.getWinner(), Player.X, 'X won diagonally L->R!');
    });

    it('X should win on default 3x3 board diagonally R->L', () => {
        const board = new Board();
        board.setPlayerMark(2, 0, Player.X);
        board.setPlayerMark(1, 1, Player.X);
        board.setPlayerMark(0, 2, Player.X);
        console.log(board.getBoardGrid());
        assert.strictEqual(board.getWinner(), Player.X, 'X won diagonally R->L!');
    });

    it('should nobody win', () => {
        const board = new Board();
        board.setPlayerMark(0, 0, Player.X);
        board.setPlayerMark(0, 1, Player.O);
        board.setPlayerMark(0, 2, Player.X);
        board.setPlayerMark(1, 1, Player.O);
        board.setPlayerMark(2, 1, Player.X);
        board.setPlayerMark(1, 0, Player.O);
        board.setPlayerMark(2, 2, Player.O);
        board.setPlayerMark(2, 2, Player.O);
        board.setPlayerMark(1, 2, Player.X);
        console.log(board.getBoardGrid());
        assert.strictEqual(board.getWinner(), null, 'it\'s a tie!');
    });

    it('it should be possible to know how many turns do we have left', () => {
        const board = new Board();
        board.setPlayerMark(2, 0, Player.X);
        board.setPlayerMark(1, 1, Player.X);
        board.setPlayerMark(0, 2, Player.X);
        assert.strictEqual(board.getFreeTurnsCount(), 6, 'It should be 6 if we already taken 3 cells in 3x3 grid');
    });

    it('it should know who\'s turn it is', () => {
        const board = new Board();
        assert.strictEqual(board.getWhosTurn(), Player.X, 'It should be X');
        board.setPlayerMark(2, 0, Player.X);
        assert.strictEqual(board.getWhosTurn(), Player.O, 'It should be O');
        board.setPlayerMark(1, 1, Player.O);
        assert.strictEqual(board.getWhosTurn(), Player.X, 'It should be X');
        board.setPlayerMark(0, 2, Player.X);
        assert.strictEqual(board.getWhosTurn(), Player.O, 'It should be O');
    });

    it('it should know who\'s turn it is and automatically place X and O by turn', () => {
        const board = new Board();
        assert.strictEqual(board.getWhosTurn(), Player.X, 'It should be X');
        board.setMark(2, 0);
        assert.strictEqual(board.getWhosTurn(), Player.O, 'It should be O');
        board.setMark(1, 1);
        assert.strictEqual(board.getWhosTurn(), Player.X, 'It should be X');
        board.setMark(0, 2);
        assert.strictEqual(board.getWhosTurn(), Player.O, 'It should be O');
    });

    it('should know when is game over', () => {
        const board = new Board();
        board.setPlayerMark(0, 0, Player.X);
        board.setPlayerMark(0, 1, Player.O);
        board.setPlayerMark(0, 2, Player.X);
        board.setPlayerMark(1, 1, Player.O);
        board.setPlayerMark(2, 1, Player.X);
        board.setPlayerMark(1, 0, Player.O);
        board.setPlayerMark(2, 2, Player.O);
        board.setPlayerMark(1, 2, Player.X);
        assert.strictEqual(board.isGameOver(), false, 'it\'s not game over yer! We have 1 turn remaining');
        board.setPlayerMark(2, 0, Player.X);
        assert.strictEqual(board.isGameOver(), true, 'it\'s  game over already! We have 0 turn remaining');
    });

});
