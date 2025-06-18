import { type Request, Router } from 'express';

import { db } from '@app/backend-shared';

const postRegisterLabelRouter = Router();

postRegisterLabelRouter.post('/register-label', async (req: Request, res) => {
  const userId = req.userId;
  const { name, logosId } = req.body;
  if (userId === undefined) {
    res.json({
      ok: false,
    });
    return;
  }
  try {
    await db
      .insertInto('labels')
      .values({
        name,
        logos_id: logosId,
        budget: 11000,
        score_xp: 0,
        notoriety: 0,
        users_id: userId,
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
