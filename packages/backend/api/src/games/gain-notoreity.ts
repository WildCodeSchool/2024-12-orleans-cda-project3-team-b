// import express from 'express';
import { type Request, Router } from 'express';

import { db } from '@app/backend-shared';

const getNotoRouter = Router();

getNotoRouter.get('/noto', async (req: Request, res) => {
  const userId = req.userId;
  if (userId === undefined) {
    res.json({
      ok: false,
    });
    return;
  }
  try {
    const labels = await db
      .selectFrom('milestones')
      .leftJoin('artists_hired', 'artists_hired.milestones_id', 'milestones.id')
      .select('milestones.value')
      .where('artists_hired.id', '=', 4)
      .execute();

    const gain = labels.map((label) => {
      const newGain = Number(label.value) / 100;
      return newGain;
    });

    res.json({ gain });
  } catch (_error) {
    res.json({
      ok: false,
    });
  }
});

export default getNotoRouter;
