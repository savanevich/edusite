import { Request, Response } from 'express';

import { FailedJsonResponse, SuccessJsonResponse } from '../utils/Responses';
import MessageService from '../services/MessageService';

class MessageController {

    /**
     * @api {get} /users/:userID/messages Get messages
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
            const messages = await MessageService.getMessages(response.locals.user, response.locals.iteratedUser);

            const successJsonResponse = new SuccessJsonResponse(200, { messages });
            successJsonResponse.send(response);
        } catch (err) {
            const failedJsonResponse = new FailedJsonResponse(500, [err.message]);

            failedJsonResponse.send(response);
        }
    }

    /**
     * @api {post} /users/:userID/messages Send a message
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
            const message = await MessageService.createMessage(request.body, response.locals.user, response.locals.iteratedUser);

            const successJsonResponse = new SuccessJsonResponse(200, { message });
            successJsonResponse.send(response);
        } catch (err) {
            const failedJsonResponse = new FailedJsonResponse(500, [err.message]);

            failedJsonResponse.send(response);
        }
    }

    /**
     * @api {put} users/:userID/messages/:messageID Update the body of the message
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

            const successJsonResponse = new SuccessJsonResponse(200, { message });
            successJsonResponse.send(response);
        } catch (err) {
            const failedJsonResponse = new FailedJsonResponse(500, [err.message]);

            failedJsonResponse.send(response);
        }
    }

    /**
     * @api {delete} users/:userID/messages/:messageID Remove the message by id
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

            const successJsonResponse = new SuccessJsonResponse(200, {});
            successJsonResponse.send(response);
        } catch (err) {
            const failedJsonResponse = new FailedJsonResponse(500, [err.message]);

            failedJsonResponse.send(response);
        }
    }
}

export default MessageController;