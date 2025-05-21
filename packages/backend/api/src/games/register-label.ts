import { type Request, Router } from 'express';

import { db } from '@app/backend-shared';

const postRegisterLabelRouter = Router();
type InsertUserInfo = {
  name: string;
  logosId: number;
};

postRegisterLabelRouter.post('/register-label', async (req: Request, res) => {
  const userId = req.userId;
  if (userId === undefined) {
    res.json({
      ok: false,
    });
    return;
  }
  const { name, logosId } = req.body as InsertUserInfo;
  try {
    await db
      .insertInto('labels')
      .values({
        name,
        logos_id: logosId,
        budget: 50000,
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
