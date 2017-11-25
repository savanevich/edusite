import { Router } from 'express';

import CategoryController from '../controllers/CategoryController';
import { checkUserAuthentication } from '../middlewares/UserMiddleware';
import {
    categoryCreateValidation,
    categoryUpdateValidation,
    fetchCategoryFromParam
} from '../middlewares/CategoryMiddleware';

export default (router: Router) => {
    router.get('/categories/:categoryID', CategoryController.getCategory);
    router.get('/categories', CategoryController.getCategories);
    router.post('/categories', checkUserAuthentication, categoryCreateValidation, CategoryController.addCategory);
    router.put('/categories/:categoryID', checkUserAuthentication, categoryUpdateValidation, CategoryController.updateCategory);
    router.delete('/categories/:categoryID', checkUserAuthentication, fetchCategoryFromParam, CategoryController.deleteCategory);
};
