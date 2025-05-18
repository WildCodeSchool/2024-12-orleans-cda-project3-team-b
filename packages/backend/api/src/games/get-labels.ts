import express from 'express';

import { db } from '@app/backend-shared';

const getLabelRouter = express.Router();

getLabelRouter.get('/labels', async (req, res) => {
  try {
    const labels = await db.selectFrom('labels').selectAll().execute();
    res.json({ labels });
  } catch (_error) {
    res.json({
      ok: false,
    });
  }
});

export default getLabelRouter;
