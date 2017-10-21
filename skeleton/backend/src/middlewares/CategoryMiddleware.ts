import { Request, Response } from 'express';

import { validateCategoryCreate } from '../validators/CategoryValidator';
import { JsonResponse } from '../interfaces/JsonResponse';
import CategoryRepository from '../repositories/CategoryRepository';

export async function categoryCreateValidation(request: Request, response: Response, next: Function): Promise<Response | void> {
    const data = request.body;
    const validationError = validateCategoryCreate(data);

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
        const category = await CategoryRepository.findOneByName(data.name);

        if (category) {
            const jsonResponse: JsonResponse = {
                success: false,
                statusCode: 409,
                errors: ['Category with this name already exists.'],
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

export async function categoryUpdateValidation(request: Request, response: Response, next: Function): Promise<Response | void> {
    const id = +request.params.id;
    const category = await CategoryRepository.findOneById(id);

    if (!category) {
        const jsonResponse: JsonResponse = {
            success: false,
            statusCode: 409,
            errors: ['Category with this id doesn\'t exist.'],
            data: false
        };

        return response.status(409).send(jsonResponse);
    }

    response.locals.category = category;
    next();
}

export async function categoryDeleteValidation(request: Request, response: Response, next: Function): Promise<Response | void> {
    const id = +request.params.id;
    const category = await CategoryRepository.findOneById(id);

    if (!category) {
        const jsonResponse: JsonResponse = {
            success: false,
            statusCode: 409,
            errors: ['Category with this id doesn\'t exist.'],
            data: false
        };

        return response.status(409).send(jsonResponse);
    }

    response.locals.category = category;
    next();
}