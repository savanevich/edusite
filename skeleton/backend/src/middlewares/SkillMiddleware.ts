import { Request, Response } from 'express';

import { validateSkill } from '../validators/SkillValidator';
import AbilityService from '../services/AbilityService';
import SkillService from '../services/SkillService';
import { FailedJsonResponse } from '../utils/Responses';

export async function skillCreateValidation(request: Request, response: Response, next: Function): Promise<Response | void> {
    const data = request.body;
    const validationError = validateSkill(data);

    if (validationError) {
        const failedJsonResponse = new FailedJsonResponse(400, [validationError.toString()]);

        return failedJsonResponse.send(response);
    }

    try {
        response.locals.ability = await AbilityService.getOrCreateAbility(data.abilityName, request.body.categoryID);

    } catch (err) {
        const failedJsonResponse = new FailedJsonResponse(409, [err.message]);

        return failedJsonResponse.send(response);
    }

    next();
}

export async function skillUpdateValidation(request: Request, response: Response, next: Function): Promise<Response | void> {
    const data = request.body;
    const validationError = validateSkill(data);

    if (validationError) {
        const failedJsonResponse = new FailedJsonResponse(400, [validationError.toString()]);

        return failedJsonResponse.send(response);
    }

    try {
        response.locals.ability = await AbilityService.getOrCreateAbility(data.abilityName, request.body.categoryID);

    } catch (err) {
        const failedJsonResponse = new FailedJsonResponse(409, [err.message]);

        return failedJsonResponse.send(response);
    }

    next();
}

export async function fetchSkillFromParam(request: Request, response: Response, next: Function): Promise<Response | void> {
    try {
        response.locals.skill = await SkillService.findOneByID(request.params.skillID, response.locals.iteratedUser.id);

    } catch (err) {
        const failedJsonResponse = new FailedJsonResponse(409, [err.message]);

        return failedJsonResponse.send(response);
    }

    next();
}