import { EMAIL_QUEUE_NAME } from '../jobs/queues/EmailQueue';

interface QueueConfig {
    worker: any;
}

interface RedisQueueConfig {
    queues: {
        [key: string]: QueueConfig
    };
}

export const config: RedisQueueConfig = {
    queues: {
        [EMAIL_QUEUE_NAME]: {
            worker: 'EmailWorker'
        }
    }
};
