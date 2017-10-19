import { Connection } from 'typeorm';

import MysqlConnector from './MysqlConnector';
import RedisConnector from './RedisConnector';
import RedisClient from '../../services/RedisClient';

class DbConnector {
    private static redisConnection: RedisClient;

    public static getConnection(): Promise<Connection> {
        return MysqlConnector.getConnection();
    }

    public static getRedisConnection(): RedisClient {
        if (!DbConnector.redisConnection) {
            DbConnector.redisConnection = new RedisClient(
                RedisConnector.getClient(),
                RedisConnector.getSubscriberClient()
            );
        }

        return DbConnector.redisConnection;
    }
}

export default DbConnector;
