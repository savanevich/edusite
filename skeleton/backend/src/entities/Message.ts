import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';

import User from './User';
import { CreateMessageRequest } from '../interfaces/CreateMessageRequest';

@Entity('messages')
export default class Message {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({
        type: 'varchar',
        length: 255
    })
    public body: string;

    @ManyToOne(type => User, user => user.sentMessages)
    public sender: User;

    @ManyToOne(type => User, user => user.receivedMessages)
    public recipient: User;

    public static create(data: CreateMessageRequest, sender: User, recipient: User): Message {
        const message = new Message();

        message.body = data.body;
        message.sender = sender;
        message.recipient = recipient;

        return message;
    }
}
