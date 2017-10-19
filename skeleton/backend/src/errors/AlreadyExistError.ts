import BaseError from './BaseError';

export const INVALID_DATA_ERROR_NAME = 'already_exist_error';

export default class AlreadyExistError extends BaseError {
    public name: string = INVALID_DATA_ERROR_NAME;
    public message: string;
    public details: Array<Object>;

    constructor(message: string, details: Array<Object> = []) {
        super(message, details);
        this.message = message;
        this.details = details;
    }
}
