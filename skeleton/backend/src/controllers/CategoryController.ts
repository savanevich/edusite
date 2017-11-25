import { Request, Response } from 'express';

import { FailedJsonResponse, SuccessJsonResponse } from '../utils/Responses';
import CategoryService from '../services/CategoryService';

class CategoryController {

    /**
     * @api {get} /categories/:id Get category by ID
     * @apiName Get Category
     * @apiGroup Categories
     *
     * @apiParam {Number} id Selected category's ID.
     *
     * @apiSuccess {JsonResponse} JsonResponse
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     "statusCode": "200",
     *     "success": "true",
     *     "data": {
     *       "category" : {
     *         "id": 1,
     *         "name": "Frontend",
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
    public static async getCategory(request: Request, response: Response): Promise<any> {
        try {
            const categoryID = +request.params.categoryID;
            const category = await CategoryService.getCategoryByID(categoryID);

            const successJsonResponse = new SuccessJsonResponse(200, { category });
            successJsonResponse.send(response);
        } catch (err) {
            const failedJsonResponse = new FailedJsonResponse(500, [err.message]);

            failedJsonResponse.send(response);
        }
    }

    /**
     * @api {get} /categories Get categories
     * @apiName Get categories
     * @apiGroup Categories
     *
     * @apiSuccess {JsonResponse} JsonResponse
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     "statusCode": "200",
     *     "success": "true",
     *     "data": [{
     *         "id": 1,
     *         "name": "Frontend",
     *     },
     *     {
     *         "id": 2,
     *         "name": "Backend",
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
    public static async getCategories(request: Request, response: Response): Promise<any> {
        try {
            const categories = await CategoryService.getCategories();

            const successJsonResponse = new SuccessJsonResponse(200, { categories });
            successJsonResponse.send(response);
        } catch (err) {
            const failedJsonResponse = new FailedJsonResponse(500, [err.message]);

            failedJsonResponse.send(response);
        }
    }

    /**
     * @api {post} /categories Create new category
     * @apiName categories
     * @apiGroup Categories
     *
     * @apiParam {String} name Category's unique name.
     *
     * @apiSuccess {JsonResponse} JsonResponse
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     "statusCode": "200",
     *     "success": "true",
     *     "data": {
     *       "category" : {
     *         "id": 1,
     *         "name": "Frontend",
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
    public static async addCategory(request: Request, response: Response): Promise<any> {
        try {
            const category = await CategoryService.createCategory(request.body);

            const successJsonResponse = new SuccessJsonResponse(200, { category });
            successJsonResponse.send(response);
        } catch (err) {
            const failedJsonResponse = new FailedJsonResponse(500, [err.message]);

            failedJsonResponse.send(response);
        }
    }

    /**
     * @api {put} /categories/:id Update the information of the category
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
     *       "category" : {
     *         "id": 1,
     *         "name": "Frontend",
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
    public static async updateCategory(request: Request, response: Response): Promise<any> {
        try {
            const category = await CategoryService.updateCategory(response.locals.category, request.body);

            const successJsonResponse = new SuccessJsonResponse(200, { category });
            successJsonResponse.send(response);
        } catch (err) {
            const failedJsonResponse = new FailedJsonResponse(500, [err.message]);

            failedJsonResponse.send(response);
        }
    }

    /**
     * @api {delete} /categories Remove the category by id
     * @apiName Delete
     * @apiGroup Categories
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
    public static async deleteCategory(request: Request, response: Response): Promise<any> {
        try {
            const category = await CategoryService.removeCategory(response.locals.category);

            const successJsonResponse = new SuccessJsonResponse(200, {});
            successJsonResponse.send(response);
        } catch (err) {
            const failedJsonResponse = new FailedJsonResponse(500, [err.message]);

            failedJsonResponse.send(response);
        }
    }
}

export default CategoryController;
