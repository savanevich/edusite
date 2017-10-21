import MessageRepository from '../repositories/MessageRepository';
import Message from "../entities/Message";
import { MessageRequest } from "../interfaces/MessageRequests";
import User from '../entities/User';

class MessageService {

    private static instance: MessageService;

    public static getInstance(): MessageService {
        if (!MessageService.instance) {
            MessageService.instance = new MessageService();
        }

        return MessageService.instance;
    }

    public async getMessages(user: User, interlocutor: User): Promise<Message[] | undefined> {
        return MessageRepository.findMessagesByInterlocutor(user, interlocutor);
    }

    public async createMessage(data: MessageRequest, user: User, interlocutor: User): Promise<Message> {
        const message: Message = await Message.create(data, user, interlocutor);

        return MessageRepository.save(message);
    }

    public async updateMessage(message: Message, data: MessageRequest) {
        if (data.body) {
            message.body = data.body;
        }

        await MessageRepository.save(message);

        return message;
    }

    public async removeMessage(message: Message) {
        message.isDeleted = true;

        await MessageRepository.save(message);

        return message;
    }

}

export default MessageService.getInstance();