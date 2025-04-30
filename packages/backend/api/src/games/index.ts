import express from 'express';

import getLogosRouter from './get-logos';
import postRegisterLabelRouter from './register-label';

const gamesRouter = express.Router();
gamesRouter.use(getLogosRouter);
gamesRouter.use(postRegisterLabelRouter);

export default gamesRouter;
