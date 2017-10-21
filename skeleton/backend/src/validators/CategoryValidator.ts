import * as Joi from 'joi';

import { CreateCategoryRequest } from '../interfaces/CategoryRequests';

export function validateCategoryCreate(data: CreateCategoryRequest): Joi.ValidationError {
    const schema = Joi.object().keys({
        name: Joi.string().required()
    });

    const { error } = Joi.validate(data, schema);

    return error;
}