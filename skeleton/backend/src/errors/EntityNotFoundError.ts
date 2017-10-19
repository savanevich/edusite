import BaseError from './BaseError';

export const ENTITY_NOT_FOUND_ERROR_NAME = 'entity_not_found';

export default class EntityNotFoundError extends BaseError {
    public name: string = ENTITY_NOT_FOUND_ERROR_NAME;
    public message: string;

    constructor(message: string) {
        super(message);
        this.message = message;
    }
}
