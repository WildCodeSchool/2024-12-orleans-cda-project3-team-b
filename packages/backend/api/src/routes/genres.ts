import express from 'express';

import { db } from '@app/backend-shared';

const genresRouter = express.Router();

genresRouter.get('/', async (req, res) => {
  try {
    const genres = await db.selectFrom('genres').selectAll().execute();
    //

    res.json(genres);
    return;
  } catch (error) {
    console.error('Error fetching artists with genres:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default genresRouter;
