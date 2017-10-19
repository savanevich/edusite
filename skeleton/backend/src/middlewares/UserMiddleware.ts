import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';

import { validateUserCreate, validateUserLogin } from '../validators/userValidator';
import UserRepository from '../repositories/UserRepository';
import DbConnector from '../utils/db/DbConnector';
import { JsonResponse } from '../interfaces/JsonResponse';

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

    response.locals.user = JSON.parse(userJson);
    next();
}

export async function userCreateValidate(request: Request, response: Response, next: Function): Promise<any> {
    const data = request.body;
    const validationError = validateUserCreate(data);

    if (validationError) {
        const jsonResponse: JsonResponse = {
            success: false,
            statusCode: 400,
            errors: [validationError.toString()],
            data: false
        };

        return response.status(400).send(jsonResponse);
    }

    try {
        const user = await UserRepository.findOneByEmailOrName(data.email, data.name);

        if (user) {
            const jsonResponse: JsonResponse = {
                success: false,
                statusCode: 409,
                errors: ['User with this email or name already exists.'],
                data: false
            };

            return response.status(409).send(jsonResponse);
        }
    } catch (err) {
        const jsonResponse: JsonResponse = {
            success: false,
            statusCode: 409,
            errors: [err.message],
            data: false
        };

        return response.status(409).send(jsonResponse);
    }

    next();
}

export async function userLoginValidate(request: Request, response: Response, next: Function): Promise<any> {
    const data = request.body;
    const validationError = validateUserLogin(data.email, data.password);

    if (validationError) {
        const jsonResponse: JsonResponse = {
            success: false,
            statusCode: 400,
            errors: [validationError.toString()],
            data: false
        };

        return response.status(400).send(jsonResponse);
    }

    const user = await UserRepository.findOneByEmail(data.email);

    if (!user) {
        const jsonResponse: JsonResponse = {
            success: false,
            statusCode: 403,
            errors: ['Authentication failed.'],
            data: false
        };

        return response.status(403).send(jsonResponse);
    }

    const isPasswordsMatch = await bcrypt.compare(data.password, user.password);

    if (isPasswordsMatch === false) {
        const jsonResponse: JsonResponse = {
            success: false,
            statusCode: 403,
            errors: ['Authentication failed.'],
            data: false
        };

        return response.status(403).send(jsonResponse);
    }

    response.locals.user = user;
    next();
}
