import { Router } from 'express';

import CommentController from '../controllers/CommentController';
import { checkUserAuthentication } from '../middlewares/UserMiddleware';
import { fetchArticleFromParam } from '../middlewares/ArticleMiddleware';
import {commentCreateValidation, commentUpdateValidation, fetchCommentFromParam } from '../middlewares/CommentMiddleware';

export default (router: Router) => {
    router.get('/articles/:articleID/comments', checkUserAuthentication, fetchArticleFromParam, CommentController.getComments);
    router.post('/articles/:articleID/comments', checkUserAuthentication, fetchArticleFromParam, commentCreateValidation, CommentController.addComment);
    router.put('/articles/:articleID/comments/:commentID', checkUserAuthentication, fetchArticleFromParam, fetchCommentFromParam, commentUpdateValidation, CommentController.updateComment);
    router.delete('/articles/:articleID/comments/:commentID', checkUserAuthentication, fetchArticleFromParam, fetchCommentFromParam, CommentController.deleteComment);
}