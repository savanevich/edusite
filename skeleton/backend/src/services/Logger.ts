import * as winston from 'winston';
import { TransportInstance, LoggerInstance } from 'winston';

class Logger {
    private static instance: Logger;
    private logger: LoggerInstance;

    public static getInstance(): Logger {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }

        return Logger.instance;
    }

    public log(message: any): void {
        this.logger.info(message);
    }

    public error(message: any): void {
        this.logger.error(message);
    }

    private constructor() {
        const transports: TransportInstance[] = [
            new (winston.transports.Console)({
                level: 'silly',
                colorize: true
            }),
            new (winston.transports.File)({
                filename: './logs/apiserver.log',
                level: 'silly'
            })
        ];

        this.logger = new (winston.Logger)({
            transports
        });
    }
}

export default Logger.getInstance();
