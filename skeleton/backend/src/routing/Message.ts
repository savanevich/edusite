import { Router } from 'express';

import MessageController from '../controllers/MessageController';
import { checkUserAuthentication } from '../middlewares/UserMiddleware';
import { messageCreateValidation, messageGetMiddleware, messageUpdateValidation, messageDeleteValidation } from '../middlewares/MessageMiddleware';

export default (router: Router) => {
    router.get('/users/:interlocutorID/messages', checkUserAuthentication, messageGetMiddleware, MessageController.getMessages);
    router.post('/users/:interlocutorID/messages', checkUserAuthentication, messageCreateValidation, MessageController.sendMessage);
    router.put('/users/:interlocutorID/messages/:messageID', checkUserAuthentication, messageUpdateValidation, MessageController.updateMessage);
    router.delete('/users/:interlocutorID/messages/:messageID', checkUserAuthentication, messageDeleteValidation, MessageController.deleteMessage);
}