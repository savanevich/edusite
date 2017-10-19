import * as Queue from 'bull';

import { config as redisConfig } from '../../configs/redis';

export const EMAIL_QUEUE_NAME = 'email';

const EmailQueue: Queue.Queue = new Queue(EMAIL_QUEUE_NAME, {
    redis: {
        port: redisConfig.port,
        host: redisConfig.host,
        password: redisConfig.password
    }
});

export default EmailQueue;
