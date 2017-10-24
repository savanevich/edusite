import { Request, Response } from 'express';

import { FailedJsonResponse, SuccessJsonResponse } from '../utils/Responses';
import UserService from '../services/UserService';

class UserController {

    /**
     * @api {post} /users/register Register the user
     * @apiName Register
     * @apiGroup Users
     *
     * @apiParam {String} email Users unique email.
     * @apiParam {String} password Users password.
     * @apiParam {String} name Users name.
     * @apiParam {Date} [birthday] Users birthday.
     *
     * @apiSuccess {JsonResponse} JsonResponse
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     "statusCode": "200",
     *     "success": "true",
     *     "data": {
     *       "user" : {
     *         "email": "john@gmail.com",
     *         "name": "John",
     *         "birthday": "2010-10-10",
     *         "active": true,
     *         "id": 1
     *       },
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
    public static async registerUser(request: Request, response: Response): Promise<any> {
        try {
            const user = await UserService.createUser(request.body);

            const successJsonResponse = new SuccessJsonResponse(200, { user });
            successJsonResponse.send(response);
        } catch (err) {
            const failedJsonResponse = new FailedJsonResponse(500, [err.message]);

            failedJsonResponse.send(response);
        }
    }

    /**
     * @api {post} /users/login Login the user
     * @apiName Login
     * @apiGroup Users
     *
     * @apiParam {String} email Users unique email.
     * @apiParam {String} password Users password.
     *
     * @apiSuccess {JsonResponse} JsonResponse
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     "statusCode": "200",
     *     "success": "true",
     *     "data": {
     *       "token" : "ksangkasngklasnk12k4nklfnsalkf",
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
    public static async loginUser(request: Request, response): Promise<any> {
        try {
            const token = await UserService.loginUser(response.locals.user);

            const successJsonResponse = new SuccessJsonResponse(200, { token });
            successJsonResponse.send(response);
        } catch (err) {
            const failedJsonResponse = new FailedJsonResponse(500, [err.message]);

            failedJsonResponse.send(response);
        }
    }

    /**
     * @api {get} /users/current Get the current user
     * @apiName Current
     * @apiGroup Users
     *
     * @apiSuccess {JsonResponse} JsonResponse
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     "statusCode": "200",
     *     "success": "true",
     *     "data": {
     *       "user" : {
     *         "email": "john@gmail.com",
     *         "password": "asfa12412fas24124dgssdg124",
     *         "name": "John",
     *         "birthday": "2010-10-10",
     *         "active": 1
     *       },
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
    public static async getCurrentUser(request: Request, response): Promise<any> {
        try {
            const successJsonResponse = new SuccessJsonResponse(200, { user: response.locals.user });
            successJsonResponse.send(response);
        } catch (err) {
            const failedJsonResponse = new FailedJsonResponse(500, [err.message]);

            failedJsonResponse.send(response);
        }
    }

    /**
     * @api {get} /users/:id Get user by ID
     * @apiName Get user
     * @apiGroup Users
     *
     * @apiParam {Number} id Selected user ID.
     *
     * @apiSuccess {JsonResponse} JsonResponse
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     "statusCode": "200",
     *     "success": "true",
     *     "data": {
     *       "user" : {
     *         "email": "john@gmail.com",
     *         "name": "John",
     *         "birthday": "2010-10-10",
     *         "active": 1
     *       },
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
    public static async getUser(request: Request, response: Response): Promise<any> {
        try {
            const userID = +request.params.id;
            const user = await UserService.getUserByID(userID);

            const successJsonResponse = new SuccessJsonResponse(200, { user });
            successJsonResponse.send(response);
        } catch (err) {
            const failedJsonResponse = new FailedJsonResponse(500, [err.message]);

            failedJsonResponse.send(response);
        }
    }

    /**
     * @api {get} /users Get users
     * @apiName Get users
     * @apiGroup Users
     *
     * @apiSuccess {JsonResponse} JsonResponse
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     "statusCode": "200",
     *     "success": "true",
     *     "data": [{
     *         "id": 1,
     *         "email": "john@gmail.com",
     *         "name": "John",
     *         "birthday": "2010-10-10",
     *         "active": 1
     *     },
     *     {
     *         "id": 2,
     *         "email": "marianne@gmail.com",
     *         "name": "Marianne",
     *         "birthday": "2010-10-10",
     *         "active": 1
     *     }],
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
    public static async getUsers(request: Request, response: Response): Promise<any> {
        try {
            const users = await UserService.getUsers();

            const successJsonResponse = new SuccessJsonResponse(200, { users });
            successJsonResponse.send(response);
        } catch (err) {
            const failedJsonResponse = new FailedJsonResponse(500, [err.message]);

            failedJsonResponse.send(response);
        }
    }

    /**
     * @api {put} /users/current Update the information of the current user
     * @apiName Update
     * @apiGroup Users
     *
     * @apiSuccess {JsonResponse} JsonResponse
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     "statusCode": "200",
     *     "success": "true",
     *     "data": {
     *       "user" : {
     *         "email": "john@gmail.com",
     *         "name": "John",
     *         "birthday": "2010-10-10",
     *         "active": 1
     *       },
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
    public static async updateUser(request: Request, response: Response): Promise<any> {
        try {
            const user = await UserService.updateUser(response.locals.user, request.body);

            const successJsonResponse = new SuccessJsonResponse(200, { user });
            successJsonResponse.send(response);
        } catch (err) {
            const failedJsonResponse = new FailedJsonResponse(500, [err.message]);

            failedJsonResponse.send(response);
        }
    }

    /**
     * @api {delete} /users/current Remove the current user
     * @apiName Delete
     * @apiGroup Users
     *
     * @apiSuccess {JsonResponse} JsonResponse
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     "statusCode": "200",
     *     "success": "true",
     *     "data": {
     *       "user" : {
     *         "email": "john@gmail.com",
     *         "name": "John",
     *         "birthday": "2010-10-10",
     *         "active": 0
     *       },
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
    public static async deleteUser(request: Request, response: Response): Promise<any> {
        try {
            const user = await UserService.setUserInactive(response.locals.user);

            const successJsonResponse = new SuccessJsonResponse(200, { user });
            successJsonResponse.send(response);
        } catch (err) {
            const failedJsonResponse = new FailedJsonResponse(500, [err.message]);

            failedJsonResponse.send(response);
        }
    }
}

export default UserController;
