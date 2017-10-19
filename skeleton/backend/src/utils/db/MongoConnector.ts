import * as Mongoose from 'mongoose';

import { config } from '../../configs/mongo';

class MongoConnector {
    private static instance: MongoConnector;

    public static getInstance(): MongoConnector {
        if (!MongoConnector.instance) {
            MongoConnector.instance = new MongoConnector();
            MongoConnector.instance.createConnection();
        }

        return MongoConnector.instance;
    }

    public createConnection(): void {
        Mongoose.connect(`mongodb://${config.host}/${config.db}`);
    }
}

export default MongoConnector.getInstance();
