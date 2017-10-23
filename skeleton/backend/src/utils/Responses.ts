import { Response } from 'express';

import { JsonResponse } from '../interfaces/JsonResponse';

export class SuccessJsonResponse implements JsonResponse {
    success = true;
    statusCode: number;
    errors = false;
    data: any;

    constructor(statusCode: number, data: any) {
        this.statusCode = statusCode;
        this.data = data;
    }

    public async send(response: Response): Promise<Response> {
        return response.status(this.statusCode).send(this);
    }
}

export class FailedJsonResponse implements JsonResponse {
    success = false;
    statusCode: number;
    errors: any;
    data = false;

    constructor(statusCode: number, data: any) {
        this.statusCode = statusCode;
        this.errors = data;
    }

    public async send(response: Response): Promise<Response> {
        return response.status(this.statusCode).send(this);
    }
}

