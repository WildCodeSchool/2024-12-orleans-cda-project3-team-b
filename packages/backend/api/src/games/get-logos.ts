import express from 'express';

import { db } from '@app/backend-shared';

const getLogosRouter = express.Router();

getLogosRouter.get('/logos', async (req, res) => {
  try {
    await db.selectFrom('logos').selectAll().execute();

    res.json({ logo: true });
  } catch (_error) {
    res.json({
      logo: false,
    });
  }
});

export default getLogosRouter;
