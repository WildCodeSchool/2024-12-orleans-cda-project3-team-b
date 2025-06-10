import { type Request, Router } from 'express';

import { db } from '@app/backend-shared';

const getLabelRouter = Router();

async function getLabels(userId: number) {
  return db
    .selectFrom('labels')
    .selectAll()
    .where('labels.users_id', '=', userId)
    .execute();
}

export type Label = Awaited<ReturnType<typeof getLabels>>[number];

getLabelRouter.get('/labels', async (req: Request, res) => {
  const userId = req.userId;
  if (userId === undefined) {
    res.json({
      ok: false,
    });
    return;
  }
  try {
    const labels = await getLabels(userId);
    res.json({ labels });
  } catch (_error) {
    res.json({
      ok: false,
    });
  }
});

export default getLabelRouter;
