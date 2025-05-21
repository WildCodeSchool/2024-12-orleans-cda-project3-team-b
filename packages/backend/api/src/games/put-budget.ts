import { type Request, Router } from 'express';

import { db } from '@app/backend-shared';

const postBuySomethinglRouter = Router();

postBuySomethinglRouter.put('/buying', async (req: Request, res) => {
  const userId = req.userId;
  const cost = req.body.cost;
  if (userId === undefined) {
    res.json({
      ok: false,
    });
    return;
  }
  try {
    await db
      .updateTable('labels')
      .set({
        budget: cost,
      })
      .where('labels.users_id', '=', userId)
      .executeTakeFirst();
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

export default postBuySomethinglRouter;
