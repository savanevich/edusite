import { Router } from 'express';

import UserController from '../controllers/UserController';
import MessageController from '../controllers/MessageController';
import FollowerController from '../controllers/FollowerController';
import {
    userCreateValidate,
    userLoginValidate,
    checkUserAuthentication,
    checkUserUpdate,
    fetchUserFromParam
} from '../middlewares/UserMiddleware';
import { messageCreateValidation, messageGetMiddleware, messageUpdateValidation, messageDeleteValidation } from '../middlewares/MessageMiddleware';
import { followerCreateValidation, followerDeleteValidation } from '../middlewares/FollowerMiddleware';

export default (router: Router) => {
    router.post('/users/register', userCreateValidate, UserController.registerUser);
    router.post('/users/login', userLoginValidate, UserController.loginUser);
    router.get('/users/current', checkUserAuthentication, UserController.getCurrentUser);
    router.put('/users/current', checkUserAuthentication, checkUserUpdate, UserController.updateUser);
    router.delete('/users/current', checkUserAuthentication, UserController.deleteUser);
    router.get('/users/:id', UserController.getUser);
    router.get('/users', UserController.getUsers);
    router.get('/users/:interlocutorID/messages', checkUserAuthentication, messageGetMiddleware, MessageController.getMessages);
    router.post('/users/:interlocutorID/messages', checkUserAuthentication, messageCreateValidation, MessageController.sendMessage);
    router.put('/users/:interlocutorID/messages/:messageID', checkUserAuthentication, messageUpdateValidation, MessageController.updateMessage);
    router.delete('/users/:interlocutorID/messages/:messageID', checkUserAuthentication, messageDeleteValidation, MessageController.deleteMessage);
    router.get('/users/:userID/followers', fetchUserFromParam, FollowerController.getUserFollowers);
    router.get('/users/:userID/following', fetchUserFromParam, FollowerController.getUserFollowing);
    router.post('/users/:userID/follow', checkUserAuthentication, fetchUserFromParam, followerCreateValidation, FollowerController.followUser);
    router.post('/users/:userID/unFollow', checkUserAuthentication, fetchUserFromParam, followerDeleteValidation, FollowerController.unFollowUser);
};
