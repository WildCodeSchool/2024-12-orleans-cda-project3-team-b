import express from 'express';

import { db } from '@app/backend-shared';

const logosRouter = express.Router();

logosRouter.get('/logos', async (req, res) => {
  try {
    const logos = await db.selectFrom('logos').selectAll().execute();

    res.json(logos);
  } catch (error) {
    // console.error('Erreur lors de la récupération des logos:', error);
    res.json(error);
  }
});

export default logosRouter;
