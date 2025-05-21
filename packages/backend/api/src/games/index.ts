import express from 'express';

import getLabelRouter from './get-labels';
import getLogosRouter from './get-logos';
import postBuySomethinglRouter from './put-budget';
import postRegisterLabelRouter from './register-label';

const gamesRouter = express.Router();
gamesRouter.use(getLogosRouter);
gamesRouter.use(postRegisterLabelRouter);
gamesRouter.use(getLabelRouter);
gamesRouter.use(postBuySomethinglRouter);

export default gamesRouter;
