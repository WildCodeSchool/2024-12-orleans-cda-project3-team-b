import express from 'express';

import artistsHiredRouter from './artists-hired/artists-hired';
import artistsRouter from './artists/artists';
import authRouter from './auth';
import demoRouter from './demo';
import authMiddleware from './middlewares/auth.middleware';

const router = express.Router();

router.use(authMiddleware);
router.use('/auth', authRouter);
router.use('/artists-hired', artistsHiredRouter);
router.use('/artists', artistsRouter);
router.use('/demo', demoRouter);

export default router;
