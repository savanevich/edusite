import { Router } from 'express';

import userRouter from './User';
import categoryRouter from './Category';
import abilityRouter from './Ability';

const router: Router = Router();
userRouter(router);
categoryRouter(router);
abilityRouter(router);

export default router;