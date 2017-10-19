import * as Redis from 'redis';
import { promisify } from 'util';

class RedisClient {
    private asyncSet: Function;
    private asyncGet: Function;
    private client: Redis.RedisClient;
    private subscriberClient: Redis.RedisClient;

    constructor(client: Redis.RedisClient, subscriberClient: Redis.RedisClient) {
        this.client = client;
        this.subscriberClient = subscriberClient;
        this.asyncGet = promisify(client.get).bind(client);
        this.asyncSet = promisify(client.set).bind(client);

        return this;
    }

    public get(key: string): Promise<string> {
        return this.asyncGet(key);
    }

    public set(key: string, value: string): Promise<'OK'> {
        return this.asyncSet(key, value);
    }

    public subscribe(key: string, cb: any): void {
        this.subscriberClient.subscribe(`__keyspace@0__:${key}`);
        this.subscriberClient.on('message', (pattern: string, channel: string, message: string) => {
            cb.call(cb, pattern, channel, message);
        });
    }

    public psubscribe(pattern: string, cb: any): void {
        this.subscriberClient.psubscribe(pattern);
        this.subscriberClient.on('pmessage', (key: string, channel: string, message: string) => {
            cb.call(cb, key, channel, message);
        });
    }
}

export default RedisClient;
