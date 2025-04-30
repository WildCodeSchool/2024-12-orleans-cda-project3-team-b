import express from 'express';

import demoRouter from './routes';
import artistsRouter from './routes/artists';
import artistsHiredRouter from './routes/artists-hired';
import genresRouter from './routes/genres';

const router = express.Router();

router.use('/demo', demoRouter);
router.use('/artists', artistsRouter);
router.use('/genres', genresRouter);
router.use('/artists-hired', artistsHiredRouter);

export default router;
