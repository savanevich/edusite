import { Request, Response } from 'express';

import { JsonResponse } from '../interfaces/JsonResponse';
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
            const categoryID = +request.params.id;
            const category = await CategoryService.getCategoryByID(categoryID);
            const jsonResponse: JsonResponse = {
                statusCode: 200,
                success: true,
                data: { category },
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
            const jsonResponse: JsonResponse = {
                statusCode: 200,
                success: true,
                data: { categories },
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

            const jsonResponse: JsonResponse = {
                statusCode: 200,
                success: true,
                data: { category },
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
            const jsonResponse: JsonResponse = {
                statusCode: 200,
                success: true,
                data: { category },
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

export default CategoryController;
