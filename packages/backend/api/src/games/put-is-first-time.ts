import express from 'express';

import { db } from '@app/backend-shared';

const putIfFistTimeRouter = express.Router();

putIfFistTimeRouter.put('/ok', async (req, res) => {
  const { userId } = req.body;
  try {
    await db
      .updateTable('users')
      .set({
        is_first_time: 0,
      })
      .where('id', '=', userId)
      .executeTakeFirst();
    res.json({ ok: true });
  } catch {
    res.json({ ok: false });
  }
});

export default putIfFistTimeRouter;
