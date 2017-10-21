import * as Joi from 'joi';

import { MessageRequest } from '../interfaces/MessageRequests';

export function validateMessage(data: MessageRequest): Joi.ValidationError {
    const schema = Joi.object().keys({
        body: Joi.string().required()
    });

    const { error } = Joi.validate(data, schema);

    return error;
}
