import { Request, Response } from 'express';

import { JsonResponse } from '../interfaces/JsonResponse';
import MessageService from '../services/MessageService';

class MessageController {

    /**
     * @api {get} /users/:interlocutorID/messages Get messages
     * @apiName Get messages between authenticated user and an interlocutor
     * @apiGroup Messages
     *
     * @apiSuccess {JsonResponse} JsonResponse
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     "statusCode": "200",
     *     "success": "true",
     *     "data": { messages:
     *       [{
     *          "id": 1,
     *          "body": "Hello. This is John",
     *          "senderId": 1,
     *          "recipientId": 2,
     *          "isDeleted": 1
     *       }, {
     *          "id": 2,
     *          "body": "Hi, Mike",
     *          "senderId": 2,
     *          "recipientId": 1,
     *          "isDeleted": 1
     *       },
     *     ]}
     *     "errors": "false"
     *
     * @apiError {JsonResponse} JsonResponse
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 500 Internal Server Error
     *     "statusCode": "500",
     *     "success": "false",
     *     "data": "false",
     *     "errors": ["Error message"]
     */
    public static async getMessages(request: Request, response: Response): Promise<any> {
        try {
            const messages = await MessageService.getMessages(response.locals.user, response.locals.interlocutor);
            const jsonResponse: JsonResponse = {
                statusCode: 200,
                success: true,
                data: { messages },
                errors: false
            };

            response.json(jsonResponse);
        } catch (err) {
            const jsonResponse: JsonResponse = {
                statusCode: 500,
                success: false,
                data: false,
                errors: [err.message]
            };

            response.status(500).json(jsonResponse);
        }
    }

    /**
     * @api {post} /users/:interlocutorID/messages Send a message
     * @apiName messages
     * @apiGroup Messages
     *
     * @apiParam {String} body Message's body.
     *
     * @apiSuccess {JsonResponse} JsonResponse
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     "statusCode": "200",
     *     "success": "true",
     *     "data": {
     *       "message" : {
     *          "id": 1,
     *          "body": "Hello. This is John",
     *          "senderId": 1,
     *          "recipientId": 2,
     *          "isDeleted": 1
     *       }
     *     },
     *     "errors": "false"
     *
     * @apiError {JsonResponse} JsonResponse
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 500 Internal Server Error
     *     "statusCode": "500",
     *     "success": "false",
     *     "data": "false",
     *     "errors": ["Error message"]
     */
    public static async sendMessage(request: Request, response: Response): Promise<any> {
        try {
            const message = await MessageService.createMessage(request.body, response.locals.user, response.locals.interlocutor);

            const jsonResponse: JsonResponse = {
                statusCode: 200,
                success: true,
                data: { message },
                errors: false
            };

            response.json(jsonResponse);
        } catch (err) {
            const jsonResponse: JsonResponse = {
                statusCode: 500,
                success: false,
                data: false,
                errors: [err.message]
            };

            response.status(500).json(jsonResponse);
        }
    }

    /**
     * @api {put} users/:interlocutor/messages/:id Update the body of the message
     * @apiName Update the message
     * @apiGroup Users
     *
     * @apiSuccess {JsonResponse} JsonResponse
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     "statusCode": "200",
     *     "success": "true",
     *     "data": {
     *       "message" : {
     *          "id": 1,
     *          "body": "Hello. This is John",
     *          "senderId": 1,
     *          "recipientId": 2,
     *          "isDeleted": 1
     *       }
     *     },
     *     },
     *     "errors": "false"
     * @apiError {JsonResponse} JsonResponse
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 500 Internal Server Error
     *     "statusCode": "500",
     *     "success": "false",
     *     "data": "false",
     *     "errors": ["Error message"]
     */
    public static async updateMessage(request: Request, response: Response): Promise<any> {
        try {
            const message = await MessageService.updateMessage(response.locals.message, request.body);
            const jsonResponse: JsonResponse = {
                statusCode: 200,
                success: true,
                data: { message },
                errors: false
            };

            response.json(jsonResponse);
        } catch (err) {
            const jsonResponse: JsonResponse = {
                statusCode: 500,
                success: false,
                data: false,
                errors: [err.message]
            };

            response.status(500).json(jsonResponse);
        }
    }

    /**
     * @api {delete} /messages Remove the message by id
     * @apiName Delete
     * @apiGroup Messages
     *
     * @apiSuccess {JsonResponse} JsonResponse
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     "statusCode": "200",
     *     "success": "true",
     *     "data": [],
     *     "errors": "false"
     *
     * @apiError {JsonResponse} JsonResponse
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 500 Internal Server Error
     *     "statusCode": "500",
     *     "success": "false",
     *     "data": "false",
     *     "errors": ["Error message"]
     */
    public static async deleteMessage(request: Request, response: Response): Promise<any> {
        try {
            const message = await MessageService.removeMessage(response.locals.message);
            const jsonResponse: JsonResponse = {
                statusCode: 200,
                success: true,
                data: [],
                errors: false
            };

            response.json(jsonResponse);
        } catch (err) {
            const jsonResponse: JsonResponse = {
                statusCode: 500,
                success: false,
                data: false,
                errors: [err.message]
            };

            response.status(500).json(jsonResponse);
        }
    }
}

export default MessageController;