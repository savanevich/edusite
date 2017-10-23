import { Request, Response } from 'express';

import FollowerRepository from '../repositories/FollowerRepository';
import { FailedJsonResponse } from "../utils/Responses";

export async function followerCreateValidation(request: Request, response: Response, next: Function): Promise<Response | void> {
    try {
        const followerRelation = await FollowerRepository.getOneByIDs(response.locals.user.id, response.locals.iteratedUser.id);

        if (followerRelation) {
            const failedJsonResponse = new FailedJsonResponse(409, ['You\'re already following the user.']);

            return failedJsonResponse.send(response);
        }
    } catch (err) {
        const failedJsonResponse = new FailedJsonResponse(409, [err.message]);

        return failedJsonResponse.send(response);
    }

    next();
}

export async function followerDeleteValidation(request: Request, response: Response, next: Function): Promise<Response | void> {
    try {
        const followingUserID = +request.params.userID;

        const followerRelation = await FollowerRepository.getOneByIDs(response.locals.user.id, followingUserID);

        if (!followerRelation) {
            const failedJsonResponse = new FailedJsonResponse(409, ['You are\'t following this user.']);

            return failedJsonResponse.send(response);
        }

        response.locals.followerRelation = followerRelation;
    } catch (err) {
        const failedJsonResponse = new FailedJsonResponse(409, [err.message]);

        return failedJsonResponse.send(response);
    }

    next();
}