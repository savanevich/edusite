import * as Joi from 'joi';

import { CreateArticleRequest, UpdateArticleRequest } from '../interfaces/ArticleRequests';

export function validateArticleCreate(data: CreateArticleRequest): Joi.ValidationError {
    const schema = Joi.object().keys({
        title: Joi.string().required(),
        preview: Joi.string().required(),
        content: Joi.string().required(),
        coverUrl: Joi.string(),
        categoryID: Joi.number().required(),
        abilities: Joi.array()
    });

    const { error } = Joi.validate(data, schema);

    return error;
}

export function validateArticleUpdate(data: UpdateArticleRequest): Joi.ValidationError {
    const schema = Joi.object().keys({
        title: Joi.string(),
        preview: Joi.string(),
        content: Joi.string(),
        coverUrl: Joi.string(),
        categoryID: Joi.number().required(),
        abilities: Joi.array()
    });

    const { error } = Joi.validate(data, schema);

    return error;
}
