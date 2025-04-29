import express from 'express';

import { db } from '@app/backend-shared';

const getLogosRouter = express.Router();

getLogosRouter.get('/logos', async (req, res) => {
  try {
    const logos = await db.selectFrom('logos').selectAll().execute();

    res.json({ logo: logos });
  } catch (_error) {
    res.json({
      logo: 'pas de logos',
    });
  }
});

export default getLogosRouter;
