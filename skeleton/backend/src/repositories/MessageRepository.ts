import { Repository } from 'typeorm';

import DbConnector from '../utils/db/DbConnector';
import BaseRepository from './BaseRepository';
import Message from '../entities/Message';
import User from '../entities/User';

class MessageRepository extends BaseRepository {
    private static instance: MessageRepository;

    private async getRepository(): Promise<Repository<Message>> {
        const connection = await DbConnector.getConnection();

        return connection.getRepository(Message);
    }

    public static getInstance(): MessageRepository {
        if (!MessageRepository.instance) {
            MessageRepository.instance = new MessageRepository();
        }

        return MessageRepository.instance;
    }

    public async save(message: Message): Promise<Message> {
        const repository = await this.getRepository();

        //noinspection TypeScriptUnresolvedFunction
        return repository.save(message);
    }

    public async findOneByID(id: number): Promise<Message | undefined> {
        const repository = await this.getRepository();

        return repository
            .createQueryBuilder('message')
            .select(['message.id', 'message.body', 'message.isDeleted', 'message.senderId', 'message.recipientId'])
            .where('message.isDeleted = :isDeleted', { isDeleted: false })
            .andWhere('message.id = :id', { id: id })
            .getOne();
    }

    public async findMessagesByInterlocutor(user: User, interlocutor: User): Promise<Message[] | undefined> {
        const repository = await this.getRepository();

        return repository
            .createQueryBuilder('message')
            .select(['message.id', 'message.body', 'message.isDeleted', 'message.senderId', 'message.recipientId'])
            .where('message.isDeleted = :isDeleted ' +
                'AND (message.sender = :userID AND message.recipient = :interlocutorID) ' +
                'OR (message.sender = :interlocutorID AND message.recipient = :userID)',
                { userID: user.id, interlocutorID: interlocutor.id, isDeleted: false })
            .getMany();
    }
}

export default MessageRepository.getInstance();
