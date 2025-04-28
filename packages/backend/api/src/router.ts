import express from 'express';

import demoRouter from './routes';
import artistsRouter from './routes/artists';

const router = express.Router();

router.use('/demo', demoRouter);
router.use('/artists', artistsRouter);

export default router;
