import express from 'express';

import putIfFistTimeRouter from './put-is-first-time';

const gamesRouter = express.Router();
gamesRouter.use(putIfFistTimeRouter);

export default gamesRouter;
