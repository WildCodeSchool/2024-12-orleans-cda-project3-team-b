import express from 'express';
import gamesRouter from 'games';

import demoRouter from './demo';

const router = express.Router();

router.use('/games', gamesRouter);
router.use('/demo', demoRouter);

export default router;
