import { Router } from 'express';

import UserController from '../controllers/UserController';
import { userCreateValidate, userLoginValidate, checkUserAuthentication } from '../middlewares/UserMiddleware';

export default (router: Router) => {
    router.post('/users/register', userCreateValidate, UserController.registerUser);
    router.post('/users/login', userLoginValidate, UserController.loginUser);
    router.get('/users/current', checkUserAuthentication, UserController.getCurrentUser);
    router.put('/users/current', checkUserAuthentication, UserController.updateUser);
    router.delete('/users/current', checkUserAuthentication, UserController.deleteUser);
    router.get('/users/:id', UserController.getUser);
    router.get('/users', UserController.getUsers);
};
