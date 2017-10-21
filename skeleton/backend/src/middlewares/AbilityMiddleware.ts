import { Request, Response } from 'express';

import { validateAbilityCreate, validateAbilityUpdate } from '../validators/AbilityValidator';
import { JsonResponse } from '../interfaces/JsonResponse';
import AbilityRepository from '../repositories/AbilityRepository';
import CategoryRepository from '../repositories/CategoryRepository';

export async function abilityCreateValidation(request: Request, response: Response, next: Function): Promise<Response | void> {
    const data = request.body;
    const validationError = validateAbilityCreate(data);

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
        const ability = await AbilityRepository.findOneByName(data.name);

        if (ability) {
            const jsonResponse: JsonResponse = {
                success: false,
                statusCode: 409,
                errors: ['Ability with this name already exists.'],
                data: false
            };

            return response.status(409).send(jsonResponse);
        }

        const category = await CategoryRepository.findOneById(data.categoryID);

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

export async function abilityUpdateValidation(request: Request, response: Response, next: Function): Promise<Response | void> {
    const data = request.body;
    const validationError = validateAbilityUpdate(data);

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

        if (data.name) {
            const ability = await AbilityRepository.findOneByName(data.name);

            if (ability) {
                const jsonResponse: JsonResponse = {
                    success: false,
                    statusCode: 409,
                    errors: ['Ability with this name already exists.'],
                    data: false
                };

                return response.status(409).send(jsonResponse);
            }
        }

        const category = await CategoryRepository.findOneById(data.categoryID);

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

        const abilityID = request.params.id;
        const ability = await AbilityRepository.findOneById(abilityID);

        if (!ability) {
            const jsonResponse: JsonResponse = {
                success: false,
                statusCode: 409,
                errors: ['Ability with this id doesn\'t exist.'],
                data: false
            };

            return response.status(409).send(jsonResponse);
        }

        response.locals.ability = ability;
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

export async function abilityDeleteValidation(request: Request, response: Response, next: Function): Promise<Response | void> {

    try {
        const abilityID = request.params.id;
        const ability = await AbilityRepository.findOneById(abilityID);

        if (!ability) {
            const jsonResponse: JsonResponse = {
                success: false,
                statusCode: 409,
                errors: ['Ability with this id doesn\'t exist.'],
                data: false
            };

            return response.status(409).send(jsonResponse);
        }

        response.locals.ability = ability;
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


