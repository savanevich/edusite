import { Router } from 'express';

import CategoryController from '../controllers/CategoryController';
import { checkUserAuthentication } from '../middlewares/UserMiddleware';
import {
    categoryCreateValidation,
    categoryUpdateValidation,
    categoryDeleteValidation
} from '../middlewares/CategoryMiddleware';

export default (router: Router) => {
    router.get('/categories/:id', CategoryController.getCategory);
    router.get('/categories', CategoryController.getCategories);
    router.post('/categories', checkUserAuthentication, categoryCreateValidation, CategoryController.addCategory);
    router.put('/categories/:id', checkUserAuthentication, categoryUpdateValidation, CategoryController.updateCategory);
    router.delete('/categories/:id', checkUserAuthentication, categoryDeleteValidation, CategoryController.deleteCategory);
};
