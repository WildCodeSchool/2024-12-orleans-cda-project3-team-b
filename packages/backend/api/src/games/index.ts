import express from 'express';

import deleteStaffRouter from './delete-staff';
import getLabelRouter from './get-labels';
import getLogosRouter from './get-logos';
import getStaffRouter from './get-staff';
import staffLabelsRouter from './get-staff-labels';
import getLabelInfoRouter from './label-info';
import getPriceRouter from './price';
import postRegisterLabelRouter from './register-label';
import staffHiredRouter from './staff-hired';

const gamesRouter = express.Router();
gamesRouter.use(getLogosRouter);
gamesRouter.use(postRegisterLabelRouter);
gamesRouter.use(getLabelRouter);
gamesRouter.use(getLabelInfoRouter);
gamesRouter.use(getStaffRouter);
gamesRouter.use(staffHiredRouter);
gamesRouter.use(staffLabelsRouter);
gamesRouter.use(deleteStaffRouter);
gamesRouter.use(getPriceRouter);

export default gamesRouter;
