import { Response, Request } from 'express';

import { SuccessJsonResponse, FailedJsonResponse } from '../utils/Responses';
import SkillService from '../services/SkillService';

class SkillController {

    /**
     * @api {get} /users/:userID/skills Get skills for particular user
     * @apiName Get Skills
     * @apiGroup Skills
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
     *      "skills" : [{
     *        "id": 1,
     *        "level": 5,
     *        "description": "I am very good at it",
     *        "abilityId": 1,
     *        "userId": 1
     *      }, {
     *        "id": 1,
     *        "level": 5,
     *        "description": "I am very good at it",
     *        "abilityId": 1,
     *        "userId": 1
     *      }
     *     ],
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
    public static async getUserSkills(request: Request, response: Response): Promise<any> {
        try {
            const skills = await SkillService.getUserSkills(response.locals.iteratedUser);

            const successJsonResponse = new SuccessJsonResponse(200, { skills });
            successJsonResponse.send(response);
        } catch (err) {

            const failedJsonResponse = new FailedJsonResponse(500, [err.message]);
            failedJsonResponse.send(response);
        }
    }

    /**
     * @api {post} /users/skills Add skill to authenticated user
     * @apiName Add Skill
     * @apiGroup Skills
     *
     * @apiParam {number} categoryID Category for selected ability
     * @apiParam {string} abilityName Ability name
     * @apiParam {String} level Users unique email.
     * @apiParam {String} description Users password.
     *
     * @apiSuccess {JsonResponse} JsonResponse
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 201 OK
     *     "statusCode": "201",
     *     "success": "true",
     *     "data": {
     *      "skills" : [{
     *        "id": 1,
     *        "level": 5,
     *        "description": "I am very good at it",
     *        "abilityId": 1,
     *        "userId": 1
     *      }, {
     *        "id": 1,
     *        "level": 2,
     *        "description": "I am not so good at it",
     *        "abilityId": 1,
     *        "userId": 1
     *      }
     *     ],
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
    public static async createUserSkill(request: Request, response: Response): Promise<any> {
        try {
            const skill = await SkillService.createUserSkill(request.body, response.locals.iteratedUser, response.locals.ability);

            const successJsonResponse = new SuccessJsonResponse(201, { skill });
            successJsonResponse.send(response);
        } catch (err) {

            const failedJsonResponse = new FailedJsonResponse(500, [err.message]);
            failedJsonResponse.send(response);
        }
    }

    /**
     * @api {put} /users/skills/skillID Edit skill of authenticated user
     * @apiName Edit Skill
     * @apiGroup Skills
     *
     * @apiParam {number} categoryID Category for selected ability
     * @apiParam {string} abilityName Ability name
     * @apiParam {number} level Level in numbers between 1 and 10.
     * @apiParam {string} description Description of why this level was chosen.
     *
     * @apiSuccess {JsonResponse} JsonResponse
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     "statusCode": "200",
     *     "success": "true",
     *     "data": {
     *      "skill" : {
     *        "id": 1,
     *        "level": 5,
     *        "description": "I am very good at it",
     *        "abilityId": 1,
     *        "userId": 1
     *      },
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
    public static async updateUserSkill(request: Request, response: Response): Promise<any> {
        try {
            const skill = await SkillService.updateUserSkill(request.body, response.locals.skill, response.locals.ability);

            const successJsonResponse = new SuccessJsonResponse(200, { skill });
            successJsonResponse.send(response);
        } catch (err) {

            const failedJsonResponse = new FailedJsonResponse(500, [err.message]);
            failedJsonResponse.send(response);
        }
    }

    /**
     * @api {delete} /users/skills/skillID Delete skill of iterated user
     * @apiName Remove Skill
     * @apiGroup Skills
     *
     *
     * @apiSuccess {JsonResponse} JsonResponse
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 202 OK
     *     "statusCode": "202",
     *     "success": "true",
     *     "data": {
     *      "skill" : {},
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
    public static async deleteUserSkill(request: Request, response: Response): Promise<any> {
        try {
            const skill = await SkillService.removeUserSkill(response.locals.skill);

            const successJsonResponse = new SuccessJsonResponse(202, { skill });
            successJsonResponse.send(response);
        } catch (err) {

            const failedJsonResponse = new FailedJsonResponse(500, [err.message]);
            failedJsonResponse.send(response);
        }
    }
}

export default SkillController;