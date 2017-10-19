interface BaseErrorInterface {
    name: string;
    message: string;
    details?: Array<Object>;
}

export default class BaseError extends Error implements BaseErrorInterface {
    public name: string = '';
    public message: string;
    public details: Array<Object>;

    constructor(message: string, details: Array<Object> = []) {
        super(message);
        this.message = message;
        this.details = details;
    }
}
