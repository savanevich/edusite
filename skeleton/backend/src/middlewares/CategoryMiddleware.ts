import { Request, Response } from 'express';

import { validateCategoryCreate } from '../validators/CategoryValidator';
import { FailedJsonResponse } from '../utils/Responses';
import CategoryRepository from '../repositories/CategoryRepository';

export async function categoryCreateValidation(request: Request, response: Response, next: Function): Promise<Response | void> {
    const data = request.body;
    const validationError = validateCategoryCreate(data);

    if (validationError) {
        const failedJsonResponse = new FailedJsonResponse(400, [validationError.toString()]);

        return failedJsonResponse.send(response);
    }

    try {
        const category = await CategoryRepository.findOneByName(data.name);

        if (category) {
            const failedJsonResponse = new FailedJsonResponse(409, ['Category with this name already exists.']);

            return failedJsonResponse.send(response);
        }
    } catch (err) {
        const failedJsonResponse = new FailedJsonResponse(404, [err.message]);

        return failedJsonResponse.send(response);
    }

    next();
}

export async function categoryUpdateValidation(request: Request, response: Response, next: Function): Promise<Response | void> {

    try {
        response.locals.category = await CategoryRepository.findOneById(request.params.categoryID);
    } catch (err) {
        const failedJsonResponse = new FailedJsonResponse(404, [err.message]);

        return failedJsonResponse.send(response);
    }

    next();
}

export async function fetchCategoryFromParam(request: Request, response: Response, next: Function): Promise<Response | void> {
    try {
        response.locals.category = await CategoryRepository.findOneById(request.params.categoryID);
    } catch (err) {
        const failedJsonResponse = new FailedJsonResponse(404, [err.message]);

        return failedJsonResponse.send(response);
    }
    next();
}