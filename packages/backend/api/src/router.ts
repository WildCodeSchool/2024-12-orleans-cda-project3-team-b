import express from 'express';

import authRouter from './auth';
import demoRouter from './demo';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/demo', demoRouter);

export default router;
