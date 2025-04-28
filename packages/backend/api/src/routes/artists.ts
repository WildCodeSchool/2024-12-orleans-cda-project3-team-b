import express from 'express';

import { db } from '@app/backend-shared';

const artistsRouter = express.Router();

artistsRouter.get('/', async (req, res) => {
  try {
    const artists = await db.selectFrom('artists').selectAll().execute();

    res.json(artists);
  } catch (error) {
    console.error('Error fetching artists:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
artistsRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const artists = await db
      .selectFrom('artists')
      .selectAll()
      .where('artists.id', '=', id)
      .execute();

    res.json(artists);
  } catch (error) {
    console.error('Error fetching artists:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default artistsRouter;
