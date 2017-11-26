import { Router } from 'express';

import userRouter from './User';
import categoryRouter from './Category';
import abilityRouter from './Ability';
import messageRouter from './Message';
import skillRouter from './Skill';
import ArticleRouter from './Article';
import CommentRouter from './Comment';

const router: Router = Router();
userRouter(router);
categoryRouter(router);
abilityRouter(router);
messageRouter(router);
skillRouter(router);
ArticleRouter(router);
CommentRouter(router);

export default router;