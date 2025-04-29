import express from 'express';

import demoRouter from './routes';
import artistsRouter from './routes/artists';
import genresRouter from './routes/genres';

const router = express.Router();

router.use('/demo', demoRouter);
router.use('/artists', artistsRouter);
router.use('/genres', genresRouter);

export default router;
