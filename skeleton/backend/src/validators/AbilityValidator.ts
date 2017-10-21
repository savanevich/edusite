import * as Joi from 'joi';

import { CreateAbilityRequest } from '../interfaces/AbilityRequests';

export function validateAbilityCreate(data: CreateAbilityRequest): Joi.ValidationError {
    const schema = Joi.object().keys({
        name: Joi.string().required(),
        categoryID: Joi.number().required()
    });

    const { error } = Joi.validate(data, schema);

    return error;
}

export function validateAbilityUpdate(data: CreateAbilityRequest): Joi.ValidationError {
    const schema = Joi.object().keys({
        name: Joi.string(),
        categoryID: Joi.number().required()
    });

    const { error } = Joi.validate(data, schema);

    return error;
}