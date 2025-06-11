import { type Request, Router } from 'express';

import { db } from '@app/backend-shared';

const albumsRouter = Router();

albumsRouter.post('/create', async (req: Request, res) => {
  const userId = req.userId;
  if (userId === undefined) {
    res.json({
      ok: false,
    });
    return;
  }
  const { artistHiredId, singleName, singleId, genreId, price } = req.body;
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

    const moneyEarn = await db
      .selectFrom('albums')
      .select('money_earned')
      .where('artists_hired_id', '=', artistHiredId)
      .executeTakeFirst();

    const newMoney = Number(moneyEarn?.money_earned) - price;

    await db
      .updateTable('labels')
      .set((eb) => ({
        budget: eb('budget', '+', Number(newMoney)),
      }))
      .where('users_id', '=', userId)
      .execute();

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
