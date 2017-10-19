import { Request, Response } from 'express';

import { ENTITY_NOT_FOUND_ERROR_NAME } from '../errors/EntityNotFoundError';
import { INVALID_DATA_ERROR_NAME } from '../errors/InvalidDataError';
import BaseError from '../errors/BaseError';

class ErrorHandler {
    public static handle(err: BaseError, req: Request, res: Response, next: Function): any {
        if (err) {
            switch (err.name) {
                case ENTITY_NOT_FOUND_ERROR_NAME:
                    return res.status(400).json({
                        error: err.message
                    });
                case INVALID_DATA_ERROR_NAME:
                    return res.status(400).json({
                        error: err.message,
                        details: err.details
                    });
                default:
                    return res.status(400).json({
                        error: err.message
                    });
            }
        }

        next();
    }
}

export default ErrorHandler;
