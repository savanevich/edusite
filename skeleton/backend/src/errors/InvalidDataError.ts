import BaseError from './BaseError';

export const INVALID_DATA_ERROR_NAME = 'invalid_data_error';

export default class InvalidDataError extends BaseError {
    public name: string = INVALID_DATA_ERROR_NAME;
    public message: string;
    public details: Array<Object>;

    constructor(message: string, details: Array<Object> = []) {
        super(message, details);
        this.message = message;
        this.details = details;
    }
}
