import app from './App';
import http from 'http';
const httpServer = http.createServer(app);
httpServer.listen(5000, () => console.log('Server started'));