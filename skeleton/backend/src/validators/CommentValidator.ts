import * as Joi from 'joi';

import { CommentRequest } from '../interfaces/CommentRequests';

export function validateComment(data: CommentRequest): Joi.ValidationError {
    const schema = Joi.object().keys({
        body: Joi.string().required()
    });

    const { error } = Joi.validate(data, schema);

    return error;
}
