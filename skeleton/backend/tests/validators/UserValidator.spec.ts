import { expect } from 'chai';
import * as faker from 'faker';

import { validateUserCreate, validateUserLogin } from '../../src/validators/UserValidator';
import { CreateUserRequest } from '../../src/interfaces/UserRequests';

describe('UserValidator', () => {
    const userObj: CreateUserRequest = {
        name: faker.name.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password()
    };

    it('should create data be valid if all data is filled', async () => {
        const data = Object.assign({}, userObj);
        const error = validateUserCreate(data);

        expect(error).to.be.eq(null);
    });

    it('should "name" field to be required and not empty', async () => {
        const data = Object.assign({}, userObj);
        data.name = '';

        const error = validateUserCreate(data);

        expect(error).to.not.be.eq(null);
    });

    it('should "email" field to be required and not empty', async () => {
        const data = Object.assign({}, userObj);
        data.email = '';

        const error = validateUserCreate(data);

        expect(error).to.not.be.eq(null);
    });

    it('should "password" field to be required and not empty', async () => {
        const data = Object.assign({}, userObj);
        data.password = '';

        const error = validateUserCreate(data);

        expect(error).to.not.be.eq(null);
    });

    it('should login data be valid if all data is filled', async () => {
        const error = validateUserLogin(faker.internet.email(), faker.internet.password());

        expect(error).to.be.eq(null);
    });

    it('should "email" field to be required and not empty', async () => {
        const error = validateUserLogin('', faker.internet.password());

        expect(error).to.not.be.eq(null);
    });

    it('should "password" field to be required and not empty', async () => {
        const error = validateUserLogin(faker.internet.email(), '');

        expect(error).to.not.be.eq(null);
    });
});
