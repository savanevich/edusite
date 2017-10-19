import { createClient, RedisClient } from 'redis';

import { config } from '../../configs/redis';

class RedisConnector {
    private static client: RedisClient;
    private static subscriberClient: RedisClient;

    public static getClient(): RedisClient {
        if (!RedisConnector.client || !RedisConnector.client.connected) {
            RedisConnector.client = RedisConnector.createClient();
        }

        return RedisConnector.client;
    }

    public static getSubscriberClient(): RedisClient {
        if (!RedisConnector.subscriberClient || !RedisConnector.subscriberClient.connected) {
            RedisConnector.subscriberClient = RedisConnector.createClient();
        }

        return RedisConnector.subscriberClient;
    }

    public static createClient(): RedisClient {
        const client = createClient({
            host: config.host,
            port: config.port,
            password: config.password
        });
        client.config('SET', 'notify-keyspace-events', 'KE$s');

        return client;
    }
}

export default RedisConnector;
