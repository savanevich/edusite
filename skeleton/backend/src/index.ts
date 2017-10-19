import * as express from 'express';
import { Express, Request, Response } from 'express';
import { createServer, Server } from 'http';
import * as bodyParser from 'body-parser';

import { config as globalConfig } from './configs/global';
import Logger from './services/Logger';
import router from './routing';
import MongoConnector from './utils/db/MongoConnector';
import ErrorHandler from './services/ErrorHandler';
import SocketServer from './services/SocketService';

const app: Express = express();
const server: Server = createServer(app);
MongoConnector.createConnection();
SocketServer.init(server);

router.get('/test', (request: Request, response: Response): void => {
    response.json({
        message: 'Hello World'
    });
});

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(router);
app.use(ErrorHandler.handle);

server.listen(globalConfig.serverPort, () => {
    Logger.log(`Server has been started on port ${globalConfig.serverPort}!`);
});

server.on('error', (error: Error) => {
    Logger.error(error);
});
