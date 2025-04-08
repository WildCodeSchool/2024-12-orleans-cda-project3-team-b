import express from 'express';

import postLoginRouter from './post-login';

const authRouter = express.Router();
authRouter.use(postLoginRouter);
// authRouter.user(registerRoute);

export default authRouter;
