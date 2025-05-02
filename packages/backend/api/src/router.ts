import express from 'express';


import demoRouter from './routes';
import artistsRouter from './routes/artists';
import artistsHiredRouter from './routes/artists-hired';
import genresRouter from './routes/genres';
import authRouter from './auth';
import demoRouter from './demo';
import authMiddleware from './middlewares/auth.middleware';


const router = express.Router();

router.use(authMiddleware);
router.use('/auth', authRouter);
router.use('/demo', demoRouter);
router.use('/artists', artistsRouter);
router.use('/genres', genresRouter);
router.use('/artists-hired', artistsHiredRouter);

export default router;
