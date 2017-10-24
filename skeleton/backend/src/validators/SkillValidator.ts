import * as Joi from 'joi';

import { SkillRequest } from '../interfaces/SkillRequests';

export function validateSkill(data: SkillRequest): Joi.ValidationError {
    const schema = Joi.object().keys({
        level: Joi.number().required(),
        description: Joi.string(),
        abilityName: Joi.string().required(),
        categoryID: Joi.number().required()
    });

    const { error } = Joi.validate(data, schema);

    return error;
}
