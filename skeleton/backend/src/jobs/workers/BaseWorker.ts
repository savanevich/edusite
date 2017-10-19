export default class BaseWorker {
    public static run(data: any, type: string): Promise<any> {
        return Promise.resolve();
    }
}
