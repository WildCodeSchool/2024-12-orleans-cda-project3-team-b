import express from 'express';

import getLabelRouter from './get-labels';
import getLogosRouter from './get-logos';
import getLabelInfoRouter from './label-info';
import postBuySomethinglRouter from './put-budget';
import postRegisterLabelRouter from './register-label';

const gamesRouter = express.Router();
gamesRouter.use(getLogosRouter);
gamesRouter.use(postRegisterLabelRouter);
gamesRouter.use(getLabelRouter);
gamesRouter.use(postBuySomethinglRouter);
gamesRouter.use(getLabelInfoRouter);

export default gamesRouter;
