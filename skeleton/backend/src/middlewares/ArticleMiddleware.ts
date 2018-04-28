import { Request, Response } from 'express';

import ArticleService from '../services/ArticleService';
import AbilityService from '../services/AbilityService';

import CategoryRepository from '../repositories/CategoryRepository';
import { FailedJsonResponse } from '../utils/Responses';
import { validateArticleCreate, validateArticleUpdate } from '../validators/ArticleValidator';
import Ability from '../entities/Ability';

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
            const failedJsonResponse = new FailedJsonResponse(400, [validationError.toString()]);

            return failedJsonResponse.send(response);
        }

        response.locals.category = await CategoryRepository.findOneById(data.categoryID);

        let abilities: Ability[] = [];
        if (data.abilities) {
            for (let abilityIndex in data.abilities) {
                const ability = await AbilityService.getOrCreateAbility(data.abilities[abilityIndex], data.categoryID);

                abilities.push(ability);
            }
        }

        response.locals.abilities = abilities;
    } catch (err) {
        const failedJsonResponse = new FailedJsonResponse(404, [err.message]);

        return failedJsonResponse.send(response);
    }

    next();
}

export async function articleUpdateValidation(request: Request, response: Response, next: Function): Promise<Response | void> {
    try {
        const data = request.body;
        const validationError = validateArticleUpdate(data);

        if (validationError) {
            const failedJsonResponse = new FailedJsonResponse(400, [validationError.toString()]);

            return failedJsonResponse.send(response);
        }

        response.locals.category = await CategoryRepository.findOneById(data.categoryID);

        let abilities: Ability[] = [];
        if (data.abilities) {
            for (let abilityIndex in data.abilities) {
                const ability = await AbilityService.getOrCreateAbility(data.abilities[abilityIndex], data.categoryID);

                abilities.push(ability);
            }
        }

        response.locals.abilities = abilities;

        if (response.locals.user.id !== response.locals.article.user.id) {
            const failedJsonResponse = new FailedJsonResponse(403, ['You don\'t have permissions to do this action.']);

            return failedJsonResponse.send(response);
        }
    } catch (err) {
        const failedJsonResponse = new FailedJsonResponse(404, [err.message]);

        return failedJsonResponse.send(response);
    }

    next();
}

export async function articleDeleteValidation(request: Request, response: Response, next: Function): Promise<Response | void> {
    try {
        if (response.locals.user.id !== response.locals.article.user.id) {
            const failedJsonResponse = new FailedJsonResponse(403, ['You don\'t have permissions to do this action.']);

            return failedJsonResponse.send(response);
        }
    } catch (err) {
        const failedJsonResponse = new FailedJsonResponse(404, [err.message]);

        return failedJsonResponse.send(response);
    }

    next();
}