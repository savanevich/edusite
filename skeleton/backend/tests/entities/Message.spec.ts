import { expect } from 'chai';

import User from '../../src/entities/User';
import Message from '../../src/entities/Message';

import { CreateUserRequest } from '../../src/interfaces/UserRequests';
import { CreateMessageRequest } from '../../src/interfaces/CreateMessageRequest';

describe('Message entity', async () => {
    const userRequest1: CreateUserRequest = {
        name: 'test1',
        email: 'test1@mail.com',
        password: '123'
    };
    let user1 = await User.create(userRequest1);

    const userRequest2: CreateUserRequest = {
        name: 'test2',
        email: 'test2@mail.com',
        password: '123'
    };
    let user2 = await User.create(userRequest2);

    it('should create method set needed properties', async () => {
        const messageRequest: CreateMessageRequest = {
            body: 'Test body'
        };
        const message: Message = Message.create(messageRequest, user1, user2);

        expect(message.body).to.be.eq(messageRequest.body);
        expect(message.sender.name).to.be.eq(user1.name);
        expect(message.sender.email).to.be.eq(user1.email);
        expect(message.recipient.name).to.be.eq(user2.name);
        expect(message.recipient.email).to.be.eq(user2.email);
    });
});
