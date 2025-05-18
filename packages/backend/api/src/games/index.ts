import express from 'express';

import getLabelRouter from './get-labels';
import getLogosRouter from './get-logos';
import getLabelInfoRouter from './label-info';
import postRegisterLabelRouter from './register-label';
import getXpRouter from './xp';

const gamesRouter = express.Router();
gamesRouter.use(getLogosRouter);
gamesRouter.use(postRegisterLabelRouter);
gamesRouter.use(getLabelRouter);
gamesRouter.use(getLabelRouter);
gamesRouter.use(getLabelInfoRouter);
gamesRouter.use(getXpRouter);

export default gamesRouter;
