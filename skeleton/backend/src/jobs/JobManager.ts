import * as Queue from 'bull';

import { config as queuesConfig } from '../configs/redisQueue';
import { QueueJob as QueueJobInterface } from '../interfaces/QueueJob';
import BaseWorker from './workers/BaseWorker';
import queues from './queues';
import { JobModel } from '../entities/mongo/Job';

class JobManager {
    private static instance: JobManager;
    private queues: Object = {};
    private isDefaultHandlersInited: boolean = false;

    public static getInstance(): JobManager {
        if (!JobManager.instance) {
            JobManager.instance = new JobManager();
            JobManager.instance.initQueues();
        }

        return JobManager.instance;
    }

    public getQueue(name: string): Queue.Queue|undefined {
        return this.queues[name];
    }

    public addJob(queueName: string, job: QueueJobInterface): Promise<Queue.Job> {
        const queue: Queue.Queue|undefined = this.getQueue(queueName);
        if (typeof queue === 'undefined') {
            throw new Error(`Queue "${queueName}" is not defined`);
        }
        return queue.add(job);
    }

    public listenQueues(): void {
        if (this.isDefaultHandlersInited) {
            return;
        }
        queues.forEach((queue: any) => {
            this.initDefaultQueueHandlers(queue);
        });
        this.isDefaultHandlersInited = true;
    }

    public addQueueHandler(queue: any, handler: Function): void {
        queue.process((job: Queue.Job) => {
            return this.process(handler, job, queue);
        });
    }

    private initQueues(): void {
        queues.forEach((queue: any) => {
            this.queues[queue.name] = queue;
        });
    }

    private initDefaultQueueHandlers(queue: any): void {
        const queueName = queue.name;
        const workerSettings = queuesConfig.queues[queueName];
        if (!workerSettings) {
            throw new Error('Queue config is not defined');
        }
        const module = require(`./workers/${workerSettings.worker}`);
        const workerClass: BaseWorker = module[workerSettings.worker];

        this.addQueueHandler(queue, workerClass['run']);
    }

    private process(handler: Function, job: Queue.Job, queue: any): void {
        const { data, type } = job.data;
        return handler.call(handler, data, type).then(() => {
            const jobLog = new JobModel({type, queue: queue.name});
            jobLog.save().catch(err => console.log('Error saving job log', err));
            console.log(`Worker done`);
        });
    }
}

export default JobManager.getInstance();
