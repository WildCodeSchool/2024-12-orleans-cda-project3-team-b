import { type Request, Router } from 'express';

import { db } from '@app/backend-shared';

const getLabelRouter = Router();

getLabelRouter.get('/labels', async (req: Request, res) => {
  const userId = req.userId;
  if (userId === undefined) {
    res.json({
      ok: false,
    });
    return;
  }

  try {
    const labels = await db
      .selectFrom('labels')
      .selectAll()
      .where('labels.users_id', '=', userId)
      .execute();
    res.json({ labels });
  } catch (_error) {
    res.json({
      ok: false,
    });
  }
});

export default getLabelRouter;
