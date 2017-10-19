import { EntityManager } from 'typeorm';

import DbConnector from '../utils/db/DbConnector';

export default class BaseRepository {
    protected entityManager: any;
    protected transactionResolver: Function;
    protected transactionRejected: Function;
}
