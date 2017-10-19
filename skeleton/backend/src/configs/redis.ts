interface RedisConfig {
    host: string;
    port: number;
    password: string;
}

export const config: RedisConfig = {
    host: 'redis',
    port: 6379,
    password: 'redispass',
};
