import express from 'express';

import getLogosRouter from './get-logos';
import postRegisterRouter from './register';

const gamesRouter = express.Router();
gamesRouter.use(getLogosRouter);
gamesRouter.use(postRegisterRouter);

export default gamesRouter;
