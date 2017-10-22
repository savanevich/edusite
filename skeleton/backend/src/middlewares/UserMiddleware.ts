import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';

import { validateUserCreate, validateUserLogin, validateUserUpdate } from '../validators/UserValidator';
import UserRepository from '../repositories/UserRepository';
import DbConnector from '../utils/db/DbConnector';
import { JsonResponse } from '../interfaces/JsonResponse';
import { FailedJsonResponse } from '../utils/Responses';

export async function checkUserAuthentication(request: Request, response, next: Function): Promise<Response | void> {
    const token = request.body.token || request.query.token || request.headers['x-access-token'];

    if (!token) {
        const jsonResponse: JsonResponse = {
            success: false,
            statusCode: 403,
            errors: ['No token provided.'],
            data: false
        };

        return response.status(403).send(jsonResponse);
    }

    const RDSClient = DbConnector.getRedisConnection();
    const userJson = await RDSClient.get(token);

    if (!userJson) {
        const jsonResponse: JsonResponse = {
            success: false,
            statusCode: 403,
            errors: ['Authentication failed.'],
            data: false
        };

        return response.status(403).send(jsonResponse);
    }

    let user = JSON.parse(userJson);
    delete user.sentMessages;

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
