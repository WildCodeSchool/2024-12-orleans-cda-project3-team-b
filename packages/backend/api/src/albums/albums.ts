import express from 'express';

import { db } from '@app/backend-shared';

const albumsRouter = express.Router();

albumsRouter.post('/create', async (req, res) => {
  const { artistHiredId, singleName, singleId, genreId } = req.body;
  try {
    if (!Number(artistHiredId)) {
      res.status(400).json({ error: 'artistId is required' });
      return;
    }

    const albumId = await db
      .insertInto('albums')
      .values({
        artists_hired_id: artistHiredId,
        name: singleName.trim(),
        genres_id: genreId,
        exp_value: 100,
        sales: 0,
        money_earned: 6000,
        score: 0,
      })
      .executeTakeFirst();

    await db
      .insertInto('singles_albums')
      .values(
        singleId.map((singleId: number) => ({
          singles_id: singleId,
          albums_id: albumId.insertId,
        })),
      )
      .execute();

    res.status(201).json({ success: true });
    return;
  } catch (err) {
    console.error('Insert failed:', err);
    res.status(500).json({ error: 'Failed to insert album' });
    return;
  }
});

export default albumsRouter;
