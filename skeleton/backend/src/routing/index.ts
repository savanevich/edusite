import { Router } from 'express';

import userRouter from './User';
import categoryRouter from './Category';
import abilityRouter from './Ability';
import messageRouter from './Message';
import skillRouter from './Skill';

const router: Router = Router();
userRouter(router);
categoryRouter(router);
abilityRouter(router);
messageRouter(router);
skillRouter(router);

export default router;