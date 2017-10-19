import { expect } from 'chai';
import { Connection } from 'typeorm';
import * as bcrypt from 'bcrypt';

import User from '../../src/entities/User';
import { CreateUserRequest } from '../../src/interfaces/UserRequests';
import DbConnector from '../../src/utils/db/DbConnector';

describe('User entity', () => {
    const password: string = '123456789';
    const birthday: string = '1990-08-27';

    const userObj: CreateUserRequest = {
        email: 'myemail@gmail.com',
        name: 'Test Name',
        password
    };

    const userObjWithBirthday: CreateUserRequest = {
        email: 'myemail@gmail.com',
        name: 'Test Name',
        password,
        birthday
    };

    let connection: Connection;

    before(async () => {
        connection = await DbConnector.getConnection();
    });

    it('should set property correctly', async () => {
        let user: User = await User.create(userObj);
        let isPasswordMatch = await bcrypt.compare(password, user.password);

        expect(user.name).to.be.eq(userObj.name);
        expect(user.email).to.be.eq(userObj.email);
        expect(user.birthday).to.be.eq(undefined);
        expect(isPasswordMatch).to.be.eq(true);
    });

    it('should create user with birthday', async () => {
        let user: User = await User.create(userObjWithBirthday);

        let actualBirthday = user.birthday ? user.birthday.getTime() : undefined;

        expect(actualBirthday).to.be.eq((new Date(Date.parse(birthday))).getTime());
    });
});
