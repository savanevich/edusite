import { Request, Response } from 'express';

import { FailedJsonResponse, SuccessJsonResponse } from '../utils/Responses';
import ArticleService from '../services/ArticleService';

class ArticleController {

    /**
     * @api {get} /articles/:articleID Get article by ID
     * @apiName Get Article
     * @apiGroup Articles
     *
     * @apiParam {Number} id Selected article's ID.
     *
     * @apiSuccess {JsonResponse} JsonResponse
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     "statusCode": "200",
     *     "success": "true",
     *     "data": {
     *       "article" : {
     *         "id": 1,
     *         "title": "JavaScript will rule the world",
     *         "preview": "Preview text",
     *         "content": "<p>Content which contains the main information</p>",
     *         "coverUrl": "developers.dev/asfsaf-asfasf",
     *         "viewsCounter": 205,
     *         "user": {
     *              "email": "john@gmail.com",
     *              "name": "John",
     *              "birthday": "2010-10-10",
     *              "active": true,
     *              "id": 1
     *         },
     *         "category" : {
     *              "id": "2",
     *              "name": "Web development"
     *         }
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
    public static async getArticle(request: Request, response: Response): Promise<any> {
        try {
            const successJsonResponse = new SuccessJsonResponse(200, { article: response.locals.article} );
            successJsonResponse.send(response);
        } catch (err) {
            const failedJsonResponse = new FailedJsonResponse(500, [err.message]);

            failedJsonResponse.send(response);
        }
    }

    /**
     * @api {get} /articles Get articles
     * @apiName Get articles
     * @apiGroup Articles
     *
     * @apiSuccess {JsonResponse} JsonResponse
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     "statusCode": "200",
     *     "success": "true",
     *     "data": { articles:
     *       [{
     *         "id": 1,
     *         "title": "TypeScript will rule the world",
     *         "preview": "Preview text",
     *         "content": "<p>Content which contains the main information</p>",
     *         "coverUrl": "developers.dev/asfsaf-asfasf",
     *         "viewsCounter": 205,
     *         "user": {
     *              "email": "john@gmail.com",
     *              "name": "John",
     *              "birthday": "2010-10-10",
     *              "active": true,
     *              "id": 1
     *         },
     *         "category" : {
     *              "id": "2",
     *              "name": "Web development"
     *         }
     *       }, {
     *         "id": 2,
     *         "title": "JavaScript is dead",
     *         "preview": "Preview text",
     *         "content": "<p>Content which contains the main information</p>",
     *         "coverUrl": "developers.dev/asfsaf-asfasf",
     *         "viewsCounter": 222,
     *         "user": {
     *              "email": "john@gmail.com",
     *              "name": "John",
     *              "birthday": "2010-10-10",
     *              "active": true,
     *              "id": 1
     *         },
     *         "category" : {
     *              "id": "2",
     *              "name": "Web development"
     *         }
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
    public static async getArticles(request: Request, response: Response): Promise<any> {
        try {
            const articles = await ArticleService.getArticles();

            const successJsonResponse = new SuccessJsonResponse(200, { articles });
            successJsonResponse.send(response);
        } catch (err) {
            const failedJsonResponse = new FailedJsonResponse(500, [err.message]);

            failedJsonResponse.send(response);
        }
    }

    /**
     * @api {post} /articles Create new article
     * @apiName articles
     * @apiGroup Articles
     *
     * @apiParam {String} title Article's title.
     * @apiParam {String} preview Article's preview.
     * @apiParam {String} content Article's content.
     * @apiParam {String} coverUrl Article's cover url.
     * @apiParam {Integer} categoryID Article's category
     *
     * @apiSuccess {JsonResponse} JsonResponse
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 201 OK
     *     "statusCode": "201",
     *     "success": "true",
     *     "data": {
     *       "article" : {
     *         "id": 1,
     *         "title": "JavaScript will rule the world",
     *         "preview": "Preview text",
     *         "content": "<p>Content which contains the main information</p>",
     *         "coverUrl": "developers.dev/asfsaf-asfasf",
     *         "viewsCounter": 205,
     *         "user": {
     *              "email": "john@gmail.com",
     *              "name": "John",
     *              "birthday": "2010-10-10",
     *              "active": true,
     *              "id": 1
     *         },
     *         "category" : {
     *              "id": "2",
     *              "name": "Web development"
     *         }
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
    public static async addArticle(request: Request, response: Response): Promise<any> {
        try {
            const article = await ArticleService.createArticle(request.body, response.locals.user, response.locals.category);

            const successJsonResponse = new SuccessJsonResponse(201, { article });
            successJsonResponse.send(response);
        } catch (err) {
            const failedJsonResponse = new FailedJsonResponse(500, [err.message]);

            failedJsonResponse.send(response);
        }
    }

    /**
     * @api {put} /articles/:articleID Update the information of the article
     * @apiName Update
     * @apiGroup Articles
     *
     * @apiParam {String} title Article's title.
     * @apiParam {String} preview Article's preview.
     * @apiParam {String} content Article's content.
     * @apiParam {String} coverUrl Article's cover url.
     * @apiParam {Integer} categoryID Article's category
     *
     * @apiSuccess {JsonResponse} JsonResponse
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     "statusCode": "200",
     *     "success": "true",
     *     "data": {
     *       "article" : {
     *         "id": 1,
     *         "title": "JavaScript will rule the world",
     *         "preview": "Preview text",
     *         "content": "<p>Content which contains the main information</p>",
     *         "coverUrl": "developers.dev/asfsaf-asfasf",
     *         "viewsCounter": 205,
     *         "user": {
     *              "email": "john@gmail.com",
     *              "name": "John",
     *              "birthday": "2010-10-10",
     *              "active": true,
     *              "id": 1
     *         },
     *         "category" : {
     *              "id": "2",
     *              "name": "Web development"
     *         }
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
    public static async updateArticle(request: Request, response: Response): Promise<any> {
        try {
            const article = await ArticleService.updateArticle(response.locals.article, response.locals.category, request.body);

            const successJsonResponse = new SuccessJsonResponse(200, { article });
            successJsonResponse.send(response);
        } catch (err) {
            const failedJsonResponse = new FailedJsonResponse(500, [err.message]);

            failedJsonResponse.send(response);
        }
    }

    /**
     * @api {delete} /articles/:articleID Remove the article by id
     * @apiName Delete
     * @apiGroup Articles
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
    public static async deleteArticle(request: Request, response: Response): Promise<any> {
        try {
            const article = await ArticleService.removeArticle(response.locals.article);

            const successJsonResponse = new SuccessJsonResponse(202, { article });
            successJsonResponse.send(response);
        } catch (err) {
            const failedJsonResponse = new FailedJsonResponse(500, [err.message]);

            failedJsonResponse.send(response);
        }
    }

    /**
     * @api {get} /articles/category/:articleID Get articles by category
     * @apiName Get articles by category
     * @apiGroup Articles
     *
     * @apiSuccess {JsonResponse} JsonResponse
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     "statusCode": "200",
     *     "success": "true",
     *     "data": { articles:
     *       [{
     *         "id": 1,
     *         "title": "TypeScript will rule the world",
     *         "preview": "Preview text",
     *         "content": "<p>Content which contains the main information</p>",
     *         "coverUrl": "developers.dev/asfsaf-asfasf",
     *         "viewsCounter": 205,
     *         "user": {
     *              "email": "john@gmail.com",
     *              "name": "John",
     *              "birthday": "2010-10-10",
     *              "active": true,
     *              "id": 1
     *         },
     *         "category" : {
     *              "id": "2",
     *              "name": "Web development"
     *         }
     *       }, {
     *         "id": 2,
     *         "title": "JavaScript is dead",
     *         "preview": "Preview text",
     *         "content": "<p>Content which contains the main information</p>",
     *         "coverUrl": "developers.dev/asfsaf-asfasf",
     *         "viewsCounter": 222,
     *         "user": {
     *              "email": "john@gmail.com",
     *              "name": "John",
     *              "birthday": "2010-10-10",
     *              "active": true,
     *              "id": 1
     *         },
     *         "category" : {
     *              "id": "2",
     *              "name": "Web development"
     *         }
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
    public static async getArticlesByCategory(request: Request, response: Response): Promise<any> {
        try {
            const articles = await ArticleService.getArticlesByCategory(response.locals.category);

            const successJsonResponse = new SuccessJsonResponse(200, { articles });
            successJsonResponse.send(response);
        } catch (err) {
            const failedJsonResponse = new FailedJsonResponse(500, [err.message]);

            failedJsonResponse.send(response);
        }
    }

    /**
     * @api {get} /users/:userID/articles Get articles by user
     * @apiName Get articles by user
     * @apiGroup Articles
     *
     * @apiSuccess {JsonResponse} JsonResponse
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     "statusCode": "200",
     *     "success": "true",
     *     "data": { articles:
     *       [{
     *         "id": 1,
     *         "title": "TypeScript will rule the world",
     *         "preview": "Preview text",
     *         "content": "<p>Content which contains the main information</p>",
     *         "coverUrl": "developers.dev/asfsaf-asfasf",
     *         "viewsCounter": 205,
     *         "user": {
     *              "email": "john@gmail.com",
     *              "name": "John",
     *              "birthday": "2010-10-10",
     *              "active": true,
     *              "id": 1
     *         },
     *         "category" : {
     *              "id": "2",
     *              "name": "Web development"
     *         }
     *       }, {
     *         "id": 2,
     *         "title": "JavaScript is dead",
     *         "preview": "Preview text",
     *         "content": "<p>Content which contains the main information</p>",
     *         "coverUrl": "developers.dev/asfsaf-asfasf",
     *         "viewsCounter": 222,
     *         "user": {
     *              "email": "john@gmail.com",
     *              "name": "John",
     *              "birthday": "2010-10-10",
     *              "active": true,
     *              "id": 1
     *         },
     *         "category" : {
     *              "id": "2",
     *              "name": "Web development"
     *         }
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
    public static async getArticlesByUser(request: Request, response: Response): Promise<any> {
        try {
            const articles = await ArticleService.getArticlesByUser(response.locals.iteratedUser);

            const successJsonResponse = new SuccessJsonResponse(200, { articles });
            successJsonResponse.send(response);
        } catch (err) {
            const failedJsonResponse = new FailedJsonResponse(500, [err.message]);

            failedJsonResponse.send(response);
        }
    }
}

export default ArticleController;
