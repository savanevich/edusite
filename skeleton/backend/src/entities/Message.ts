import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

import User from './User';
import { MessageRequest } from '../interfaces/MessageRequests';

@Entity('messages')
export default class Message {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({
        type: 'varchar',
        length: 255
    })
    public body: string;

    @Column({
        type: 'smallint',
        length: 1
    })
    public isDeleted: boolean = false;

    @Column({
        type: 'int',
    })
    public senderId: number;

    @Column({
        type: 'int',
    })
    public recipientId: number;

    @CreateDateColumn()
    public createdAt: Date;
    @UpdateDateColumn()
    public updatedAt: Date;

    @ManyToOne(type => User, user => user.sentMessages)
    public sender: User;

    @ManyToOne(type => User, user => user.receivedMessages)
    public recipient: User;

    public static create(data: MessageRequest, sender: User, recipient: User): Message {
        const message = new Message();

        message.body = data.body;
        message.sender = sender;
        message.recipient = recipient;
        message.isDeleted = false;

        return message;
    }
}
