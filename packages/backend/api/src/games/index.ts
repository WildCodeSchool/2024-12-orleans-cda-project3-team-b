import express from 'express';

import getLabelRouter from './get-labels';
import getLogosRouter from './get-logos';
import postRegisterLabelRouter from './register-label';
import pointRouter from './update-point';

const gamesRouter = express.Router();
gamesRouter.use(getLogosRouter);
gamesRouter.use(postRegisterLabelRouter);
gamesRouter.use(getLabelRouter);
gamesRouter.use(getLabelRouter);
gamesRouter.use(pointRouter);

export default gamesRouter;
