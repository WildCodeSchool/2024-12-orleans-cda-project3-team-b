import express from 'express';

import { db } from '@app/backend-shared';

const postRegisterLabelRouter = express.Router();
type Info = {
  name: string;
  logosId: number;
  budget: number;
  scoreXp: number;
  notoriety: number;
};

postRegisterLabelRouter.post('/register-label', async (req, res) => {
  const { name, logosId } = req.body as Info;
  try {
    await db
      .insertInto('label')
      .values({
        name,
        logos_id: logosId,
        budget: 50000,
        score_xp: 25,
        notoriety: 0,
      })
      .execute();
    res.json({
      ok: true,
    });
  } catch (error) {
    res.json({
      message: error,
      ok: false,
    });
  }
});

export default postRegisterLabelRouter;
