import { Router } from 'express';

import MessageController from '../controllers/MessageController';
import { checkUserAuthentication, fetchUserFromParam } from '../middlewares/UserMiddleware';
import { messageCreateValidation, messageUpdateValidation, messageDeleteValidation } from '../middlewares/MessageMiddleware';

export default (router: Router) => {
    router.get('/users/:userID/messages', checkUserAuthentication, fetchUserFromParam, MessageController.getMessages);
    router.post('/users/:userID/messages', checkUserAuthentication, fetchUserFromParam, messageCreateValidation, MessageController.sendMessage);
    router.put('/users/:userID/messages/:messageID', checkUserAuthentication, fetchUserFromParam, messageUpdateValidation, MessageController.updateMessage);
    router.delete('/users/:userID/messages/:messageID', checkUserAuthentication, fetchUserFromParam, messageDeleteValidation, MessageController.deleteMessage);
}