import express from 'express';

import { db } from '@app/backend-shared';

const getLogosRouter = express.Router();

function getLogos() {
  return db.selectFrom('logos').selectAll().execute();
}

export type Logo = Awaited<ReturnType<typeof getLogos>>[number];

getLogosRouter.get('/logos', async (req, res) => {
  try {
    const logos = await getLogos();

    res.json({ logos });
  } catch (_error) {
    res.json({
      ok: false,
    });
  }
});

export default getLogosRouter;
