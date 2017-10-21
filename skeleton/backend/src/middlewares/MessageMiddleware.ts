import { Request, Response } from 'express';

import { validateMessage } from '../validators/MessageValidator';
import UserRepository from '../repositories/UserRepository';
import MessageRepository from '../repositories/MessageRepository';
import { FailedJsonResponse } from "../utils/Responses";

export async function messageGetMiddleware(request: Request, response: Response, next: Function): Promise<Response | void> {

    try {
        const interlocutorID = +request.params.interlocutorID;
        const interlocutor = await UserRepository.findOneById(interlocutorID);

        if (!interlocutor) {
            const failedJsonResponse = new FailedJsonResponse(409, ['Interlocutor with this id doesn\'t exist.']);

            return failedJsonResponse.send(response);
        }

        response.locals.interlocutor = interlocutor;
    } catch (err) {
        const failedJsonResponse = new FailedJsonResponse(409, [err.message]);

        return failedJsonResponse.send(response);
    }

    next();
}

export async function messageCreateValidation(request: Request, response: Response, next: Function): Promise<Response | void> {
    const data = request.body;
    const validationError = validateMessage(data);

    if (validationError) {
        const failedJsonResponse = new FailedJsonResponse(400, [validationError.toString()]);

        return failedJsonResponse.send(response);
    }

    try {
        const interlocutorID = +request.params.interlocutorID;
        const interlocutor = await UserRepository.findOneById(interlocutorID);

        if (!interlocutor) {
            const failedJsonResponse = new FailedJsonResponse(400, ['Interlocutor with this id doesn\'t exist.']);

            return failedJsonResponse.send(response);
        }

        response.locals.interlocutor = interlocutor;
    } catch (err) {
        const failedJsonResponse = new FailedJsonResponse(409, [err.message]);

        return failedJsonResponse.send(response);
    }

    next();
}

export async function messageUpdateValidation(request: Request, response: Response, next: Function): Promise<Response | void> {
    const data = request.body;
    const validationError = validateMessage(data);

    if (validationError) {
        const failedJsonResponse = new FailedJsonResponse(400, [validationError.toString()]);

        return failedJsonResponse.send(response);
    }

    try {
        const interlocutorID = +request.params.interlocutorID;
        const interlocutor = await UserRepository.findOneById(interlocutorID);

        if (!interlocutor) {
            const failedJsonResponse = new FailedJsonResponse(400, ['Interlocutor with this id doesn\'t exist.']);

            return failedJsonResponse.send(response);
        }

        response.locals.interlocutor = interlocutor;

        const messageID: number = +request.params.messageID;
        const message = await MessageRepository.findOneByID(messageID);

        if (!message) {
            const failedJsonResponse = new FailedJsonResponse(400, ['Message with this id doesn\'t exist.']);

            return failedJsonResponse.send(response);
        }

        if (message.senderId !== response.locals.user.id) {
            const failedJsonResponse = new FailedJsonResponse(400, ['You don\'t have permission to edit this message']);

            return failedJsonResponse.send(response);
        }

        response.locals.message = message;
    } catch (err) {
        const failedJsonResponse = new FailedJsonResponse(409, [err.message]);

        return failedJsonResponse.send(response);
    }

    next();
}

export async function messageDeleteValidation(request: Request, response: Response, next: Function): Promise<Response | void> {

    try {
        const interlocutorID = +request.params.interlocutorID;
        const interlocutor = await UserRepository.findOneById(interlocutorID);

        if (!interlocutor) {
            const failedJsonResponse = new FailedJsonResponse(400, ['Interlocutor with this id doesn\'t exist.']);

            return failedJsonResponse.send(response);
        }

        response.locals.interlocutor = interlocutor;

        const messageID: number = +request.params.messageID;
        const message = await MessageRepository.findOneByID(messageID);

        if (!message) {
            const failedJsonResponse = new FailedJsonResponse(400, ['Message with this id doesn\'t exist.']);

            return failedJsonResponse.send(response);
        }

        if (message.senderId !== response.locals.user.id) {
            const failedJsonResponse = new FailedJsonResponse(400, ['You don\'t have permission to delete this message']);

            return failedJsonResponse.send(response);
        }

        response.locals.message = message;
    } catch (err) {
        const failedJsonResponse = new FailedJsonResponse(409, [err.message]);

        return failedJsonResponse.send(response);
    }

    next();
}