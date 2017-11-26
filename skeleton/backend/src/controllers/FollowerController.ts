import { Response, Request } from 'express';

import { SuccessJsonResponse, FailedJsonResponse } from '../utils/Responses';
import FollowerService from '../services/FollowerService';

class FollowerController {

    /**
     * @api {get} /users/:userID/followers Get followers for particular user
     * @apiName Get Followers
     * @apiGroup Followers
     *
     * @apiParam {Number} userID Selected user's ID.
     *
     * @apiSuccess {JsonResponse} JsonResponse
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     "statusCode": "200",
     *     "success": "true",
     *     "data": {
     *       "followers" : [{
     *         "id": 1,
     *         "followerId": 1,
     *         "followingId": 2
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
    public static async getUserFollowers(request: Request, response: Response): Promise<any> {
        try {
            const followers = await FollowerService.getUserFollowers(response.locals.iteratedUser);

            const successJsonResponse = new SuccessJsonResponse(200, { followers });
            successJsonResponse.send(response);
        } catch (err) {

            const failedJsonResponse = new FailedJsonResponse(500, [err.message]);
            failedJsonResponse.send(response);
        }
    }

    /**
     * @api {get} /users/:userID/following Get following users for particular user
     * @apiName Get Following
     * @apiGroup Followers
     *
     * @apiParam {Number} userID Selected user's ID.
     *
     * @apiSuccess {JsonResponse} JsonResponse
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     "statusCode": "200",
     *     "success": "true",
     *     "data": {
     *       "following" : [{
     *         "id": 1,
     *         "followerId": 1,
     *         "followingId": 2
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
    public static async getUserFollowing(request: Request, response: Response): Promise<any> {
        try {
            const following = await FollowerService.getUserFollowing(response.locals.iteratedUser);

            const successJsonResponse = new SuccessJsonResponse(200, { following });
            successJsonResponse.send(response);
        } catch (err) {

            const failedJsonResponse = new FailedJsonResponse(500, [err.message]);
            failedJsonResponse.send(response);
        }
    }

    /**
     * @api {post} /users/:userID/follow Follow particular user
     * @apiName Follow User
     * @apiGroup Followers
     *
     * @apiParam {Number} userID Selected user's ID.
     *
     * @apiSuccess {JsonResponse} JsonResponse
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 201 OK
     *     "statusCode": "201",
     *     "success": "true",
     *     "data": {
     *       "followRelation" : {
     *         "id": 1,
     *         "followerId": 1,
     *         "followingId": 2
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
    public static async followUser(request: Request, response: Response): Promise<any> {
        try {
            const followRelation = await FollowerService.followUser(response.locals.user, response.locals.iteratedUser);

            const successJsonResponse = new SuccessJsonResponse(201, { followRelation });
            successJsonResponse.send(response);
        } catch (err) {

            const failedJsonResponse = new FailedJsonResponse(500, [err.message]);
            failedJsonResponse.send(response);
        }
    }

    /**
     * @api {post} /users/:userID/unFollow Stop following particular user
     * @apiName Un follow User
     * @apiGroup Followers
     *
     * @apiParam {Number} userID Selected user's ID.
     *
     * @apiSuccess {JsonResponse} JsonResponse
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 202 OK
     *     "statusCode": "202",
     *     "success": "true",
     *     "data": {
     *       "followRelation" : {},
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
    public static async unFollowUser(request: Request, response: Response): Promise<any> {
        try {
            const followRelation = await FollowerService.unFollowUser(response.locals.followerRelation);

            const successJsonResponse = new SuccessJsonResponse(202, { followRelation });
            successJsonResponse.send(response);
        } catch (err) {

            const failedJsonResponse = new FailedJsonResponse(500, [err.message]);
            failedJsonResponse.send(response);
        }
    }
}

export default FollowerController;