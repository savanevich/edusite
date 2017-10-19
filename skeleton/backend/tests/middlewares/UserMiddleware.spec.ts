import { expect } from 'chai';
import * as faker from 'faker';
import * as sinon from 'sinon';
import { Request, Response } from 'express';

import { CreateUserRequest } from '../../src/interfaces/UserRequests';
import UserRepository from '../../src/repositories/UserRepository';
import DbConnector from '../../src/utils/db/DbConnector';
import User from '../../src/entities/User';
import { RequestBuilder } from '../factories/express/RequestBuilder';
import { ResponseBuilder } from '../factories/express/ResponseBuilder';
import { checkUserAuthentication, userCreateValidate, userLoginValidate } from '../../src/middlewares/UserMiddleware';
import UserService from '../../src/services/UserService';

describe('UserMiddleware', () => {
    let mockUser: User;
    let mockUserToken: string;

    let requestBuilder: RequestBuilder;
    let request: Request;
    let responseBuilder: ResponseBuilder;
    let response: Response;
    let nextFunc;

    const validData: CreateUserRequest = {
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
    };

    const userData: CreateUserRequest = {
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: '123456789',
    };

    before(async () => {
        const user: User = await User.create(userData);
        mockUser = await UserRepository.save(user);
        mockUserToken = await UserService.loginUser(mockUser);
    });

    after(async () => {
        const connection = await DbConnector.getConnection();
        connection.getRepository(User).remove(mockUser);
    });

    beforeEach(() => {
        requestBuilder = new RequestBuilder();
        request = requestBuilder.build();
        responseBuilder = new ResponseBuilder();
        response = responseBuilder.build();
        response.locals = {};
        nextFunc = sinon.stub();
    });

    it('userAuth should call next function if data valid', async () => {
        requestBuilder.setBody({});
        requestBuilder.setHeaders({
            'x-access-token': mockUserToken
        });

        await checkUserAuthentication(request, response, nextFunc);

        expect(nextFunc.called).to.be.eq(true);
    });

    it('userAuth should return 403 if no token', async () => {
        requestBuilder.setBody({});
        requestBuilder.setHeaders({});

        sinon.stub(response, 'status').callsFake(status => {
            expect(status).to.be.eq(403);
            return response;
        });

        await checkUserAuthentication(request, response, nextFunc);

        expect(nextFunc.called).to.be.eq(false);
    });

    it('userAuth should return 403 if no user token invalid', async () => {
        requestBuilder.setBody({});
        requestBuilder.setHeaders({
            'x-access-token': faker.random.word()
        });

        sinon.stub(response, 'status').callsFake(status => {
            expect(status).to.be.eq(403);
            return response;
        });

        await checkUserAuthentication(request, response, nextFunc);

        expect(nextFunc.called).to.be.eq(false);
    });

    it('userCreate should call next function if data valid', async () => {
        requestBuilder.setBody(validData);

        await userCreateValidate(request, response, nextFunc);

        expect(nextFunc.called).to.be.eq(true);
    });

    it('userCreate should return 400 if data invalid', async () => {
        requestBuilder.setBody({});

        sinon.stub(response, 'status').callsFake(status => {
            expect(status).to.be.eq(400);
            return response;
        });

        await userCreateValidate(request, response, nextFunc);

        expect(nextFunc.called).to.be.eq(false);
    });

    it('userCreate should return 409 if user with email exist', async () => {
        requestBuilder.setBody(userData);

        sinon.stub(response, 'status').callsFake(status => {
            expect(status).to.be.eq(409);
            return response;
        });

        await userCreateValidate(request, response, nextFunc);

        expect(nextFunc.called).to.be.eq(false);
    });

    it('userLogin should call next function if data valid', async () => {
        requestBuilder.setBody({
            email: userData.email,
            password: userData.password
        });

        await userLoginValidate(request, response, nextFunc);

        expect(nextFunc.called).to.be.eq(true);
    });

    it('userLogin should return 400 if data invalid', async () => {
        requestBuilder.setBody({});

        sinon.stub(response, 'status').callsFake(status => {
            expect(status).to.be.eq(400);
            return response;
        });

        await userLoginValidate(request, response, nextFunc);

        expect(nextFunc.called).to.be.eq(false);
    });

    it('userLogin should return 403 if no user with email', async () => {
        requestBuilder.setBody({
            email: faker.internet.email(),
            password: faker.internet.password()
        });

        sinon.stub(response, 'status').callsFake(status => {
            expect(status).to.be.eq(403);
            return response;
        });

        await userLoginValidate(request, response, nextFunc);

        expect(nextFunc.called).to.be.eq(false);
    });

    it("userLogin should return 403 if passwords didn't match", async () => {
        requestBuilder.setBody({
            email: userData.email,
            password: faker.internet.password()
        });

        sinon.stub(response, 'status').callsFake(status => {
            expect(status).to.be.eq(403);
            return response;
        });

        await userLoginValidate(request, response, nextFunc);

        expect(nextFunc.called).to.be.eq(false);
    });
});
