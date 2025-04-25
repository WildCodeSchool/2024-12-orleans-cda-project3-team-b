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
  const { name, logosId, budget, scoreXp, notoriety } = req.body as Info;
  try {
    await db
      .insertInto('label')
      .values({ name, logos_id: logosId, budget, score_xp: scoreXp, notoriety })
      .execute();
    res.json({
      // message: label,
      ok: true,
    });
  } catch (error) {
    res.json({
      message: error,
      ok: true,
    });
  }
});

export default postRegisterRouter;
