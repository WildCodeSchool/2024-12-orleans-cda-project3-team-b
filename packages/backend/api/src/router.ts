import express from 'express';

import getMeRouter from './auth/get-me';
import postLoginRouter from './auth/post-login';
import postRegisterRouter from './auth/post-register';
import authMiddleware from './middlewares/auth.middleware';
import artistsRouter from './routes/artists';
import artistsHiredRouter from './routes/artists-hired';
import genresRouter from './routes/genres';

const router = express.Router();

router.use(authMiddleware);
router.use('/artists', artistsRouter);
router.use('/login', postLoginRouter);
router.use('/register', postRegisterRouter);
router.use('/genres', genresRouter);
router.use('/artists-hired', artistsHiredRouter);
router.use('/get-me', getMeRouter);

export default router;
