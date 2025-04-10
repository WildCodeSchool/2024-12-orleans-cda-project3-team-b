import express from 'express';

import getMeRouter from './get-me';
import postLoginRouter from './post-login';
import postLogOutRouter from './post-logout';
import postRegisterRouter from './post-register';

const authRouter = express.Router();
authRouter.use(postLogOutRouter);
authRouter.use(postLoginRouter);
authRouter.use(getMeRouter);
authRouter.use(postRegisterRouter);

export default authRouter;
