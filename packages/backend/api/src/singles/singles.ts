import { type Request, Router } from 'express';

import { db } from '@app/backend-shared';

const singlesRouter = Router();

singlesRouter.get('/:id', async (req: Request, res) => {
  const singleId = Number(req.params.id);
  const userId = req.userId;
  if (userId === undefined) {
    res.json({
      ok: false,
    });
    return;
  }

  try {
    const singles = await db
      .selectFrom('singles')
      .leftJoin('artists_hired', 'singles.artists_hired_id', 'artists_hired.id')
      .leftJoin(
        'label_artists',
        'label_artists.artists_hired_id',
        'artists_hired.id',
      )
      .leftJoin('labels', 'labels.id', 'label_artists.label_id')
      .leftJoin('users', 'users.id', 'labels.users_id')
      .leftJoin('artists', 'artists.id', 'artists_hired.artists_id')
      .where('singles.id', '=', singleId)
      .where('labels.users_id', '=', userId)
      .select([
        'singles.artists_hired_id',
        'singles.name',
        'singles.listeners',
        'singles.money_earned',
        'singles.score',
        'artists.firstname as artist_firstname',
        'artists.lastname as artist_lastname',
        'artists.alias as artist_alias',
      ])
      .execute();

    res.json(singles);
    return;
  } catch (error) {
    console.error('Error fetching singles:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

singlesRouter.get('/', async (req: Request, res) => {
  const userId = req.userId;
  if (userId === undefined) {
    res.json({
      ok: false,
    });
    return;
  }

  try {
    const singles = await db
      .selectFrom('singles')
      .leftJoin('artists_hired', 'singles.artists_hired_id', 'artists_hired.id')
      .leftJoin(
        'label_artists',
        'label_artists.artists_hired_id',
        'artists_hired.id',
      )
      .leftJoin('labels', 'labels.id', 'label_artists.label_id')
      .leftJoin('users', 'users.id', 'labels.users_id')
      .leftJoin('artists', 'artists.id', 'artists_hired.artists_id')
      .select([
        'singles.id as id',
        'singles.artists_hired_id',
        'singles.name',
        'singles.listeners',
        'singles.money_earned',
        'singles.score',
        'artists.firstname as artist_firstname',
        'artists.lastname as artist_lastname',
        'artists.alias as artist_alias',
      ])
      .where('labels.users_id', '=', userId)
      .execute();

    res.json(singles);
    return;
  } catch (error) {
    console.error('Error fetching singles:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

singlesRouter.post('/', async (req: Request, res) => {
  const { artistHiredId, singleName, genreId, price } = req.body;

  const userId = req.userId;
  if (userId === undefined) {
    res.json({
      ok: false,
    });
    return;
  }

  try {
    if (!Number(artistHiredId)) {
      res.status(400).json({ error: 'artistId is required' });
      return;
    }

    await db
      .insertInto('singles')
      .values({
        artists_hired_id: artistHiredId,
        name: singleName.trim(),
        genres_id: genreId,
        exp_value: 100,
        listeners: 0,
        money_earned: 2000,
        score: 0,
      })
      .execute();

    const moneyEarn = await db
      .selectFrom('singles')
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

    res.status(201).json({ success: true });
    return;
  } catch (err) {
    console.error('Insert failed:', err);
    res.status(500).json({ error: 'Failed to insert single' });
    return;
  }
});

export default singlesRouter;
