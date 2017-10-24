import { Request, Response } from 'express';

import { validateAbilityCreate, validateAbilityUpdate } from '../validators/AbilityValidator';
import { FailedJsonResponse } from '../utils/Responses';
import AbilityRepository from '../repositories/AbilityRepository';
import CategoryRepository from '../repositories/CategoryRepository';

export async function abilityCreateValidation(request: Request, response: Response, next: Function): Promise<Response | void> {
    const data = request.body;
    const validationError = validateAbilityCreate(data);

    if (validationError) {
        const failedJsonResponse = new FailedJsonResponse(500, [validationError.toString()]);

        return failedJsonResponse.send(response);
    }

    try {
        const ability = await AbilityRepository.findOneByName(data.name);

        if (ability) {
            const failedJsonResponse = new FailedJsonResponse(409, ['Ability with this name already exists.']);

            return failedJsonResponse.send(response);
        }

        response.locals.category = await CategoryRepository.findOneById(data.categoryID);
    } catch (err) {
        const failedJsonResponse = new FailedJsonResponse(500, [err.message]);

        return failedJsonResponse.send(response);
    }

    next();
}

export async function abilityUpdateValidation(request: Request, response: Response, next: Function): Promise<Response | void> {
    const data = request.body;
    const validationError = validateAbilityUpdate(data);

    if (validationError) {
        const failedJsonResponse = new FailedJsonResponse(500, [validationError.toString()]);

        return failedJsonResponse.send(response);
    }

    try {
        if (data.name) {
            const ability = await AbilityRepository.findOneByName(data.name);

            if (ability) {
                const failedJsonResponse = new FailedJsonResponse(409, ['Ability with this name already exists.']);

                return failedJsonResponse.send(response);
            }
        }

        response.locals.category = await CategoryRepository.findOneById(data.categoryID);
        response.locals.ability = await AbilityRepository.findOneById(request.params.id);
    } catch (err) {
        const failedJsonResponse = new FailedJsonResponse(500, [err.message]);

        return failedJsonResponse.send(response);
    }

    next();
}

export async function abilityDeleteValidation(request: Request, response: Response, next: Function): Promise<Response | void> {

    try {
        response.locals.ability = await AbilityRepository.findOneById(request.params.id);
    } catch (err) {
        const failedJsonResponse = new FailedJsonResponse(500, [err.message]);

        return failedJsonResponse.send(response);
    }

    next();
}
