import express from 'express';

import authRouter from './auth';
import authMiddleware from './middlewares/auth.middleware';
import artistsRouter from './routes/artists';
import artistsHiredRouter from './routes/artists-hired';
import genresRouter from './routes/genres';

const router = express.Router();

router.use(authMiddleware);
router.use('/auth', authRouter);
router.use('/artists', artistsRouter);
router.use('/genres', genresRouter);
router.use('/artists-hired', artistsHiredRouter);

export default router;
