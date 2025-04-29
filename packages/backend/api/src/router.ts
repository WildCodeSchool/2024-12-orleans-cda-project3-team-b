import express from 'express';

import authRouter from './auth';
import demoRouter from './demo';
import authMiddleware from './middlewares/auth.middleware';

const router = express.Router();

router.use(authMiddleware);
router.use('/auth', authRouter);
router.use('/demo', demoRouter);

export default router;
