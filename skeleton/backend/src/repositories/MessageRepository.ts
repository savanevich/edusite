import DbConnector from '../utils/db/DbConnector';

import BaseRepository from './BaseRepository';
import Message from '../entities/Message';
import User from '../entities/User';

class MessageRepository extends BaseRepository {
    private static instance: MessageRepository;

    public static getInstance(): MessageRepository {
        if (!MessageRepository.instance) {
            MessageRepository.instance = new MessageRepository();
        }

        return MessageRepository.instance;
    }

    public getUserMessages(userId: number): void {

    }

    public async save(message: Message): Promise<Message> {
        const connection = await DbConnector.getConnection();

        return connection.getRepository(Message).persist(message);
    }
}

export default MessageRepository.getInstance();
