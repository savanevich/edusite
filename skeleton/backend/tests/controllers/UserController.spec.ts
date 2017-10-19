import { expect } from 'chai';
import * as httpMocks from 'node-mocks-http';
import * as faker from 'faker';

import UserController from '../../src/controllers/UserController';
import UserService from '../../src/services/UserService';
import DbConnector from '../../src/utils/db/DbConnector';
import User from '../../src/entities/User';

describe('User controller', () => {
    let mockUser: User;
    let mockUserToken: string;

    const userData = {
        name: faker.name.firstName(),
        email: faker.internet.email(),
        password: '123456789'
    };

    const correctUserData = {
        name: faker.name.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password()
    };

    const incorrectUserData = {
        name: null,
        email: 'incorrect email',
        password: null
    };

    before(async () => {
        mockUser = await UserService.createUser(userData);
        mockUserToken = await UserService.loginUser(mockUser);
    });

    after(async () => {
        const connection = await DbConnector.getConnection();

        await connection.getRepository(User).remove(mockUser);
    });

    it('should create user', async () => {
        const request = httpMocks.createRequest({
            method: 'POST',
            url: '/user/register',
            body: correctUserData
        });
        const response = httpMocks.createResponse();

        await UserController.register(request, response);

        const data = JSON.parse(response._getData());
        const user = data.user;

        expect(response.statusCode).to.be.eq(200);
        expect(response._isJSON()).to.be.eq(true);
        expect(data).to.have.property('user');

        expect(user.name).to.be.eq(correctUserData.name);
        expect(user.email).to.be.eq(correctUserData.email);
    });

    it('should throw error if user data invalid', async () => {
        const request  = httpMocks.createRequest({
            method: 'POST',
            url: '/user/register',
            params: incorrectUserData
        });
        const response = httpMocks.createResponse();

        await UserController.register(request, response);

        expect(response.statusCode).to.be.eq(500);
        expect(response._isJSON()).to.be.eq(true);
    });

    it('should throw error if user with email exist', async () => {
        const userWithExistingEmail = {
            name: correctUserData.name,
            email: userData.email,
            password: correctUserData.password
        };

        const request  = httpMocks.createRequest({
            method: 'POST',
            url: '/user/register',
            params: userWithExistingEmail
        });
        const response = httpMocks.createResponse();

        await UserController.register(request, response);

        expect(response.statusCode).to.be.eq(500);
        expect(response._isJSON()).to.be.eq(true);
    });

    it('should login user and return token', async () => {
        const request  = httpMocks.createRequest({
            method: 'POST',
            url: '/user/login',
            params: {
                email: userData.email,
                password: userData.password
            }
        });
        const response = httpMocks.createResponse();
        response.locals = {
            user: mockUser
        };

        await UserController.login(request, response);

        const data = JSON.parse(response._getData());

        expect(response.statusCode).to.be.eq(200);
        expect(response._isJSON()).to.be.eq(true);

        expect(data.token).to.be.a('string');
    });

    it('should throw error if login data invalid', async () => {
        const request  = httpMocks.createRequest({
            method: 'POST',
            url: '/user/login',
            params: {
                email: null,
                password: userData.password
            }
        });
        const response = httpMocks.createResponse();

        await UserController.login(request, response);

        expect(response.statusCode).to.be.eq(500);
        expect(response._isJSON()).to.be.eq(true);
    });

    it('should return user by token', async () => {
        const request  = httpMocks.createRequest({
            method: 'GET',
            url: '/user/me',
            params: {
                token: mockUserToken
            }
        });
        const response = httpMocks.createResponse();
        response.locals = {
            user: mockUser
        };

        await UserController.getCurrentUser(request, response);

        const data = JSON.parse(response._getData());
        const user = data.user;

        expect(response.statusCode).to.be.eq(200);
        expect(response._isJSON()).to.be.eq(true);

        expect(user.name).to.be.eq(mockUser.name);
        expect(user.email).to.be.eq(mockUser.email);
    });

    it('should throw error if token invalid', async () => {
        const request  = httpMocks.createRequest({
            method: 'GET',
            url: '/user/me',
            params: {
                token: null
            }
        });
        const response = httpMocks.createResponse();

        await UserController.getCurrentUser(request, response);

        expect(response.statusCode).to.be.eq(500);
        expect(response._isJSON()).to.be.eq(true);
    });
});
