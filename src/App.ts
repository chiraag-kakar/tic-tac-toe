import express from 'express';
import { Express } from 'express-serve-static-core';
import router from './routes/game.routes';
class App {
    public express: Express;
    constructor () {
        this.express = express();
        this.express.use('/', router);
    }
}
const app = new App();
export const exp =  app.express;
