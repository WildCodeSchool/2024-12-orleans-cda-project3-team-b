import express from 'express';

import albumsRouter from './albums/albums';
import artistsHiredRouter from './artists-hired/artists-hired';
import artistsRouter from './artists/artists';
import authRouter from './auth';
import demoRouter from './demo';
import gamesRouter from './games';
import marketingRouter from './marketing/marketing';
import authMiddleware from './middlewares/auth.middleware';
import singlesRouter from './singles/singles';

const router = express.Router();

router.use(authMiddleware);
router.use('/auth', authRouter);
router.use('/games', gamesRouter);
router.use('/artists-hired', artistsHiredRouter);
router.use('/artists', artistsRouter);
router.use('/marketing', marketingRouter);
router.use('/albums', albumsRouter);
router.use('/singles', singlesRouter);
router.use('/demo', demoRouter);

export default router;
