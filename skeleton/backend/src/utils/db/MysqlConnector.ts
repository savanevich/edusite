import { createConnection, getConnectionManager, Connection } from 'typeorm';
import 'reflect-metadata';

import { ENTITIES } from './../../entities';
import { config } from '../../configs/mysql';

const CONNECTION_NAME: string = 'default';

class MysqlConnector {
    private static instance: MysqlConnector;

    public static getInstance(): MysqlConnector {
        if (!MysqlConnector.instance) {
            MysqlConnector.instance = new MysqlConnector();
        }

        return MysqlConnector.instance;
    }

    private static initConnection(): Promise<Connection> {
        return createConnection({
            name: CONNECTION_NAME,
            type: 'mysql',
            host: config.host,
            port: config.port,
            username: config.username,
            password: config.password,
            database: config.database,
            entities: ENTITIES, // __dirname + "/entities/*.ts"
            synchronize: config.synchronize,
            logging: false
        });
    }

    public getConnection(): Promise<Connection> {
        const connectionManager = getConnectionManager();
        if (!connectionManager.has(CONNECTION_NAME)) {
            return MysqlConnector.initConnection();
        } else {
            return Promise.resolve(connectionManager.get(CONNECTION_NAME));
        }
    }
}

export default MysqlConnector.getInstance();
