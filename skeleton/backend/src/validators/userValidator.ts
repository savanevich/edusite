import * as Joi from 'joi';

import { CreateUserRequest } from '../interfaces/UserRequests';

export function validateUserCreate(data: CreateUserRequest): Joi.ValidationError {
    const schema = Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        name: Joi.string().required(),
        birthday: Joi.date().optional()
    });

    const { error } = Joi.validate(data, schema);

    return error;
}

export function validateUserLogin(email: string, password: string): Joi.ValidationError {
    const schema = Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    });

    const { error } = Joi.validate({ email, password }, schema);

    return error;
}
