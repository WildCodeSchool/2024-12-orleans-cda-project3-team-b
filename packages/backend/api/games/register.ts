import express from 'express';

import { db } from '@app/backend-shared';

const postRegisterRouter = express.Router();
type Info = {
  name: string;
  logosId: number;
  budget: number;
  scoreXp: number;
  notoriety: number;
};

postRegisterRouter.post('/register', async (req, res) => {
  const { name, logosId, budget, scoreXp, notoriety }: Info = req.body;

  const label = await db
    .insertInto('label')
    .values({ name, logos_id: logosId, budget, score_xp: scoreXp, notoriety })
    .execute();

  res.json({
    message: label,
    ok: true,
  });
});

export default postRegisterRouter;
