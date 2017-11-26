import { Request, Response } from 'express';

import { FailedJsonResponse, SuccessJsonResponse } from '../utils/Responses';
import AbilityService from '../services/AbilityService';

class AbilityController {

    /**
     * @api {get} /abilities/:id Get ability by ID
     * @apiName Get Ability
     * @apiGroup Abilities
     *
     * @apiParam {Number} id Selected ability's ID.
     *
     * @apiSuccess {JsonResponse} JsonResponse
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     "statusCode": "200",
     *     "success": "true",
     *     "data": {
     *       "ability" : {
     *         "id": 1,
     *         "name": "JavaScript",
     *         "category" : {
     *            "id": "2",
     *            "name": "Web development"
     *         }
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
    public static async getAbility(request: Request, response: Response): Promise<any> {
        try {
            const abilityID = +request.params.id;
            const ability = await AbilityService.getAbilityByID(abilityID);

            const successJsonResponse = new SuccessJsonResponse(200, { ability });
            successJsonResponse.send(response);
        } catch (err) {
            const failedJsonResponse = new FailedJsonResponse(500, [err.message]);

            failedJsonResponse.send(response);
        }
    }

    /**
     * @api {get} /abilities Get abilities
     * @apiName Get abilities
     * @apiGroup Abilities
     *
     * @apiSuccess {JsonResponse} JsonResponse
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     "statusCode": "200",
     *     "success": "true",
     *     "data": { abilities:
     *       [{
     *          "id": 1,
     *          "name": "JavaScript",
     *          "category" : {
     *             "id": "2",
     *             "name": "Web development"
     *          }
     *       }, {
     *          "id": 2,
     *          "name": "PHP",
     *          "category" : {
     *             "id": "2",
     *             "name": "Web development"
     *          }
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
    public static async getAbilities(request: Request, response: Response): Promise<any> {
        try {
            const abilities = await AbilityService.getAbilities();

            const successJsonResponse = new SuccessJsonResponse(200, { abilities });
            successJsonResponse.send(response);
        } catch (err) {
            const failedJsonResponse = new FailedJsonResponse(500, [err.message]);

            failedJsonResponse.send(response);
        }
    }

    /**
     * @api {post} /abilities Create new ability
     * @apiName abilities
     * @apiGroup Abilities
     *
     * @apiParam {String} name Ability's unique name.
     *
     * @apiSuccess {JsonResponse} JsonResponse
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 201 OK
     *     "statusCode": "201",
     *     "success": "true",
     *     "data": {
     *       "ability" : {
     *         "id": 1,
     *         "name": "JavaScript",
     *         "category" : {
     *            "categoryID": "2",
     *            "name": "Web development"
     *         }
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
    public static async addAbility(request: Request, response: Response): Promise<any> {
        try {
            const ability = await AbilityService.createAbility(request.body, response.locals.category);

            const successJsonResponse = new SuccessJsonResponse(201, { ability });
            successJsonResponse.send(response);
        } catch (err) {
            const failedJsonResponse = new FailedJsonResponse(500, [err.message]);

            failedJsonResponse.send(response);
        }
    }

    /**
     * @api {put} /abilities/:id Update the information of the ability
     * @apiName Update
     * @apiGroup Users
     *
     * @apiSuccess {JsonResponse} JsonResponse
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 204 OK
     *     "statusCode": "204",
     *     "success": "true",
     *     "data": {
     *       "ability" : {
     *         "id": 1,
     *         "name": "JavaScript",
     *         "category" : {
     *            "id": "2",
     *            "name": "Web development"
     *         }
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
    public static async updateAbility(request: Request, response: Response): Promise<any> {
        try {
            const ability = await AbilityService.updateAbility(response.locals.ability, response.locals.category, request.body);

            const successJsonResponse = new SuccessJsonResponse(204, { ability });
            successJsonResponse.send(response);
        } catch (err) {
            const failedJsonResponse = new FailedJsonResponse(500, [err.message]);

            failedJsonResponse.send(response);
        }
    }

    /**
     * @api {delete} /abilities Remove the ability by id
     * @apiName Delete
     * @apiGroup Abilities
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
    public static async deleteAbility(request: Request, response: Response): Promise<any> {
        try {
            const ability = await AbilityService.removeAbility(response.locals.ability);

            const successJsonResponse = new SuccessJsonResponse(202, {});
            successJsonResponse.send(response);
        } catch (err) {
            const failedJsonResponse = new FailedJsonResponse(500, [err.message]);

            failedJsonResponse.send(response);
        }
    }

    /**
     * @api {get} /abilities/category/:id Get abilities by category
     * @apiName Get abilities by category
     * @apiGroup Abilities
     *
     * @apiSuccess {JsonResponse} JsonResponse
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     "statusCode": "200",
     *     "success": "true",
     *     "data": { abilities:
     *       [{
     *          "id": 1,
     *          "name": "JavaScript",
     *          "category" : {
     *             "id": "2",
     *             "name": "Web development"
     *          }
     *       }, {
     *          "id": 2,
     *          "name": "PHP",
     *          "category" : {
     *             "id": "2",
     *             "name": "Web development"
     *          }
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
    public static async getAbilitiesByCategory(request: Request, response: Response): Promise<any> {
        try {
            const abilities = await AbilityService.getAbilitiesByCategory(response.locals.category);

            const successJsonResponse = new SuccessJsonResponse(200, { abilities });
            successJsonResponse.send(response);
        } catch (err) {
            const failedJsonResponse = new FailedJsonResponse(500, [err.message]);

            failedJsonResponse.send(response);
        }
    }
}

export default AbilityController;
