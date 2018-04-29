import { Request, Response } from 'express';

import { FailedJsonResponse, SuccessJsonResponse } from '../utils/Responses';
import CommentService from '../services/CommentService';

class CommentController {

    /**
     * @api {get} /api/v1/articles/:articleID/comments Get comments
     * @apiName Get comments for the article
     * @apiGroup Comments
     *
     * @apiSuccess {JsonResponse} JsonResponse
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     "statusCode": "200",
     *     "success": "true",
     *     "data": { comments:
     *       [{
     *          "id": 1,
     *          "body": "Nice Article!",
     *          "user" : {
     *              "email": "john@gmail.com",
     *              "name": "John",
     *              "birthday": "2010-10-10",
     *              "active": true,
     *              "id": 1
     *          },
     *       }, {
     *          "id": 2,
     *          "body": "It was nice to read it,
     *          "user" : {
     *              "email": "john@gmail.com",
     *              "name": "John",
     *              "birthday": "2010-10-10",
     *              "active": true,
     *              "id": 1
     *          },
     *       }
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
    public static async getComments(request: Request, response: Response): Promise<any> {
        try {
            const comments = await CommentService.getComments(response.locals.article);

            const successJsonResponse = new SuccessJsonResponse(200, { comments });
            successJsonResponse.send(response);
        } catch (err) {
            const failedJsonResponse = new FailedJsonResponse(500, [err.message]);

            failedJsonResponse.send(response);
        }
    }

    /**
     * @api {post} /api/v1/articles/:articleID/comments Add a comment to the post
     * @apiName comments
     * @apiGroup Comments
     *
     * @apiParam {String} body Comment's body.
     *
     * @apiSuccess {JsonResponse} JsonResponse
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 201 OK
     *     "statusCode": "201",
     *     "success": "true",
     *     "data": {
     *       "comment" : {
     *          "id": 1,
     *          "body": "Nice Article!",
     *          "user" : {
     *              "email": "john@gmail.com",
     *              "name": "John",
     *              "birthday": "2010-10-10",
     *              "active": true,
     *              "id": 1
     *          },
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
    public static async addComment(request: Request, response: Response): Promise<any> {
        try {
            const comment = await CommentService.createComment(request.body, response.locals.user, response.locals.article);

            const successJsonResponse = new SuccessJsonResponse(201, { comment });
            successJsonResponse.send(response);
        } catch (err) {
            const failedJsonResponse = new FailedJsonResponse(500, [err.message]);

            failedJsonResponse.send(response);
        }
    }

    /**
     * @api {put} /api/v1/articles/:articleID/comments/:commentID Update the body of the comment
     * @apiName Update the comment
     * @apiGroup Users
     *
     * @apiSuccess {JsonResponse} JsonResponse
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     "statusCode": "200",
     *     "success": "true",
     *     "data": {
     *       "article" : {
     *          "id": 1,
     *          "body": "Nice Article!",
     *          "user" : {
     *              "email": "john@gmail.com",
     *              "name": "John",
     *              "birthday": "2010-10-10",
     *              "active": true,
     *              "id": 1
     *          },
     *       }
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
    public static async updateComment(request: Request, response: Response): Promise<any> {
        try {
            const comment = await CommentService.updateComment(response.locals.comment, request.body);

            const successJsonResponse = new SuccessJsonResponse(200, { comment });
            successJsonResponse.send(response);
        } catch (err) {
            const failedJsonResponse = new FailedJsonResponse(500, [err.message]);

            failedJsonResponse.send(response);
        }
    }

    /**
     * @api {delete} /api/v1/articles/:articleID/comments/:commentID Remove the comment by id
     * @apiName Delete
     * @apiGroup Comments
     *
     * @apiSuccess {JsonResponse} JsonResponse
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 202 OK
     *     "statusCode": "202",
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
    public static async deleteComment(request: Request, response: Response): Promise<any> {
        try {
            const comment = await CommentService.removeComment(response.locals.comment);

            const successJsonResponse = new SuccessJsonResponse(202, {});
            successJsonResponse.send(response);
        } catch (err) {
            const failedJsonResponse = new FailedJsonResponse(500, [err.message]);

            failedJsonResponse.send(response);
        }
    }
}

export default CommentController;