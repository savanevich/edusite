import { Request, Response } from 'express';

import { validateComment } from '../validators/CommentValidator';
import CommentRepository from '../repositories/CommentRepository';
import { FailedJsonResponse } from '../utils/Responses';

export async function commentCreateValidation(request: Request, response: Response, next: Function): Promise<Response | void> {
    const data = request.body;
    const validationError = validateComment(data);

    if (validationError) {
        const failedJsonResponse = new FailedJsonResponse(400, [validationError.toString()]);

        return failedJsonResponse.send(response);
    }

    next();
}

export async function commentUpdateValidation(request: Request, response: Response, next: Function): Promise<Response | void> {
    const data = request.body;
    const validationError = validateComment(data);

    if (validationError) {
        const failedJsonResponse = new FailedJsonResponse(400, [validationError.toString()]);

        return failedJsonResponse.send(response);
    }

    next();
}

export async function fetchCommentFromParam(request: Request, response: Response, next: Function): Promise<Response | void> {

    try {
        const commentID: number = +request.params.commentID;
        const comment = await CommentRepository.findOneByID(commentID);

        if (!comment || comment.userId !== response.locals.user.id) {
            const failedJsonResponse = new FailedJsonResponse(400, ['You don\'t have permission to delete this comment']);

            return failedJsonResponse.send(response);
        }

        response.locals.comment = comment;
    } catch (err) {
        const failedJsonResponse = new FailedJsonResponse(404, [err.message]);

        return failedJsonResponse.send(response);
    }

    next();
}