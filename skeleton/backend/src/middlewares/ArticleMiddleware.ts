import { Request, Response } from 'express';

import ArticleService from '../services/ArticleService';
import CategoryRepository from '../repositories/CategoryRepository';
import { FailedJsonResponse } from '../utils/Responses';
import { validateArticleCreate, validateArticleUpdate } from '../validators/ArticleValidator';

export async function fetchArticleFromParam(request: Request, response: Response, next: Function): Promise<Response | void> {
    try {
        const articleID = +request.params.articleID;
        response.locals.article = await ArticleService.getArticleByID(articleID);

    } catch (err) {
        const failedJsonResponse = new FailedJsonResponse(409, [err.message]);

        return failedJsonResponse.send(response);
    }

    next();
}

export async function articleCreateValidation(request: Request, response: Response, next: Function): Promise<Response | void> {
    try {
        const data = request.body;
        const validationError = validateArticleCreate(data);

        if (validationError) {
            const failedJsonResponse = new FailedJsonResponse(500, [validationError.toString()]);

            return failedJsonResponse.send(response);
        }

        response.locals.category = await CategoryRepository.findOneById(data.categoryID);
    } catch (err) {
        const failedJsonResponse = new FailedJsonResponse(409, [err.message]);

        return failedJsonResponse.send(response);
    }

    next();
}

export async function articleUpdateValidation(request: Request, response: Response, next: Function): Promise<Response | void> {
    try {
        const data = request.body;
        const validationError = validateArticleUpdate(data);

        if (validationError) {
            const failedJsonResponse = new FailedJsonResponse(500, [validationError.toString()]);

            return failedJsonResponse.send(response);
        }

        response.locals.category = await CategoryRepository.findOneById(data.categoryID);

        if (response.locals.user.id !== response.locals.article.user.id) {
            const failedJsonResponse = new FailedJsonResponse(409, ['You don\'t have permissions to do this action.']);

            return failedJsonResponse.send(response);
        }
    } catch (err) {
        const failedJsonResponse = new FailedJsonResponse(409, [err.message]);

        return failedJsonResponse.send(response);
    }

    next();
}

export async function articleDeleteValidation(request: Request, response: Response, next: Function): Promise<Response | void> {
    try {
        if (response.locals.user.id !== response.locals.article.user.id) {
            const failedJsonResponse = new FailedJsonResponse(409, ['You don\'t have permissions to do this action.']);

            return failedJsonResponse.send(response);
        }
    } catch (err) {
        const failedJsonResponse = new FailedJsonResponse(409, [err.message]);

        return failedJsonResponse.send(response);
    }

    next();
}