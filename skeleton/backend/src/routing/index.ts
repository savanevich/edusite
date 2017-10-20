import { Router } from 'express';

import userRouter from './user';
import categoryRouter from './category';

const router: Router = Router();
userRouter(router);
categoryRouter(router);

export default router;