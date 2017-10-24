import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';

import { validateUserCreate, validateUserLogin, validateUserUpdate } from '../validators/UserValidator';
import UserRepository from '../repositories/UserRepository';
import DbConnector from '../utils/db/DbConnector';
import { FailedJsonResponse } from '../utils/Responses';

export async function checkUserAuthentication(request: Request, response, next: Function): Promise<Response | void> {
    const token = request.body.token || request.query.token || request.headers['x-access-token'];

    if (!token) {
        const failedJsonResponse = new FailedJsonResponse(409, ['No token provided.']);

        return failedJsonResponse.send(response);
    }

    const RDSClient = DbConnector.getRedisConnection();
    const userJson = await RDSClient.get(token);

    if (!userJson) {
        const failedJsonResponse = new FailedJsonResponse(403, ['Authentication failed.']);

        return failedJsonResponse.send(response);
    }

    let user = JSON.parse(userJson);
    delete user.sentMessages;
    delete user.receivedMessages;
    delete user.password;

    response.locals.user = user;
    next();
}

export async function userCreateValidate(request: Request, response: Response, next: Function): Promise<any> {
    const data = request.body;
    const validationError = validateUserCreate(data);

    if (validationError) {
        const failedJsonResponse = new FailedJsonResponse(409, [validationError.toString()]);

        return failedJsonResponse.send(response);
    }

    try {
        const user = await UserRepository.findOneByEmailOrName(data.email, data.name);

        if (user) {
            const failedJsonResponse = new FailedJsonResponse(409, ['User with this email or name already exists.']);

            return failedJsonResponse.send(response);
        }
    } catch (err) {
        const failedJsonResponse = new FailedJsonResponse(409, [err.message]);

        return failedJsonResponse.send(response);
    }

    next();
}

export async function userLoginValidate(request: Request, response: Response, next: Function): Promise<any> {
    const data = request.body;
    const validationError = validateUserLogin(data.email, data.password);

    if (validationError) {
        const failedJsonResponse = new FailedJsonResponse(409, [validationError.toString()]);

        return failedJsonResponse.send(response);
    }

    const user = await UserRepository.findOneByEmail(data.email);

    if (!user) {
        const failedJsonResponse = new FailedJsonResponse(403, ['Authentication failed.']);

        return failedJsonResponse.send(response);
    }

    const isPasswordsMatch = await bcrypt.compare(data.password, user.password);

    if (isPasswordsMatch === false) {
        const failedJsonResponse = new FailedJsonResponse(403, ['Authentication failed.']);

        return failedJsonResponse.send(response);
    }

    response.locals.user = user;
    next();
}

export async function checkUserUpdate(request: Request, response: Response, next: Function): Promise<any> {
    const data = request.body;
    const validationError = validateUserUpdate(data);

    if (validationError) {
        const failedJsonResponse = new FailedJsonResponse(409, [validationError.toString()]);

        return failedJsonResponse.send(response);
    }

    next();
}

export async function fetchUserFromParam(request: Request, response: Response, next: Function): Promise<any> {
    const id = +request.params.userID;
    const iteratedUser = await UserRepository.findOneById(id);

    if (!iteratedUser) {
        const failedJsonResponse = new FailedJsonResponse(409, ['User with this id doesn\'t exist.']);

        return failedJsonResponse.send(response);
    }

    response.locals.iteratedUser = iteratedUser;
    next();
}

export async function onlyAdminOrAuthenticatedUser(request: Request, response: Response, next: Function): Promise<any> {

    // For now, it will only check if authenticated user is the owner of id param from the url
    if (response.locals.user.id !== response.locals.iteratedUser.id) {
        const failedJsonResponse = new FailedJsonResponse(409, ['You don\'t have permissions to do this action.']);

        return failedJsonResponse.send(response);
    }

    next();
}