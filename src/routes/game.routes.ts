import express from 'express';
import Board from "../engine/Board";
import { responseObject } from "../Response/ResponseObject";
import { ILogMessage } from "../interfaces/ILogMessage";

class GameRoutes {
    private gameBoard: Board|null = null;
    private actionsLog: ILogMessage[] = [];
    private gameStarted: boolean = false;
    public router = express.Router();
    constructor () {
        this.mountRoutes();
    }

    private mountRoutes ():void {
        this.gameBoard = new Board();
        /* API RULES */
        this.router.use(function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });

        this.router.get('/', (req, res) => {
            const response = !this.gameStarted
                ? responseObject('Hello Players! Wanna play?', this.gameBoard!, this.actionsLog)
                : responseObject(this.gameBoard!.getMessage(), this.gameBoard!, this.actionsLog);
            this.gameBoard!.setMessage(response.message!.toString());
            this.addLogMessage(response.message!.toString());
            res.json(response);
        });

        this.router.get('/reset', (req, res) => {
            this.gameBoard = new Board();
            this.gameBoard.setMessage('Loading...');
            this.clearLogMessages();
            res.json(
                responseObject(`${this.gameBoard.getWhosTurn()} starts the game!`, this.gameBoard, this.actionsLog));
        });

        this.router.get('/mark', (req, res) => {
            this.gameStarted = true;
            if (this.gameBoard!.setMark(parseInt(req.query.x!.toString()), parseInt(req.query.y!.toString()))) {
                const response
                    = responseObject(`Index used  { x => ${req.query.x};  y => ${req.query.y} }. Now it's turn for "${this.gameBoard!.getWhosTurn()}"`, this.gameBoard!, this.actionsLog);
                this.gameBoard!.setMessage(response.message!.toString());
                this.addLogMessage(response.message!.toString());
                res.json(response);
            } else {
                const response
                    = responseObject(`Cell is occupied [x:${req.query.x};y:${req.query.y}]. 
                        Now it's still turn for ${this.gameBoard!.getWhosTurn()}`, this.gameBoard!, this.actionsLog);
                this.gameBoard!.setMessage(response.message!.toString());
                this.addLogMessage(response.message!.toString());
                res.json(response);
            }
        });

        this.router.get('/state', (req, res) => {
            res.json({
                message: this.gameBoard!.getMessage(),
                gameOver: this.gameBoard!.isGameOver(),
                grid: this.gameBoard!.getBoardGrid(),
                started: this.gameStarted
            });
        });

        this.router.get('/log', (req, res) => {
            res.json({
                log: this.actionsLog
            });
        });
    }

    private addLogMessage(message: string) {
        this.actionsLog.push({
            message
        });
    }

    private clearLogMessages() {
        this.actionsLog = [];
    }

}
export default new GameRoutes().router;
