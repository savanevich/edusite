import { Router } from 'express';

import ArticleController from '../controllers/ArticleController';
import { checkUserAuthentication, fetchUserFromParam } from '../middlewares/UserMiddleware';
import {
    fetchArticleFromParam,
    articleCreateValidation,
    articleUpdateValidation,
    articleDeleteValidation
} from '../middlewares/ArticleMiddleware';
import { fetchCategoryFromParam } from '../middlewares/CategoryMiddleware';

export default (router: Router) => {
    router.get('/articles/:articleID', fetchArticleFromParam, ArticleController.getArticle);
    router.get('/articles', ArticleController.getArticles);
    router.post('/articles', checkUserAuthentication, articleCreateValidation, ArticleController.addArticle);
    router.put('/articles/:articleID', checkUserAuthentication, fetchArticleFromParam, articleUpdateValidation, ArticleController.updateArticle);
    router.delete('/articles/:articleID', checkUserAuthentication, fetchArticleFromParam, articleDeleteValidation, ArticleController.deleteArticle);
    router.get('/articles/categories/:categoryID', fetchCategoryFromParam, ArticleController.getArticlesByCategory);
    router.get('/users/:userID/articles', fetchUserFromParam, ArticleController.getArticlesByUser);
};
