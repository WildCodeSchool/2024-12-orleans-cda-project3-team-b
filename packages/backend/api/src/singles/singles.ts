import { type Request, Router } from 'express';

import { db } from '@app/backend-shared';

const singlesRouter = Router();

singlesRouter.get('/artist/:id', async (req: Request, res) => {
  const artistId = Number(req.params.id);
  const userId = req.userId;
  if (userId === undefined) {
    res.json({
      ok: false,
    });
    return;
  }

  try {
    const singles = await db
      .selectFrom('users')
      .where('users.id', '=', userId)
      .leftJoin('labels', 'labels.users_id', 'users.id')
      .leftJoin('label_artists', 'label_artists.label_id', 'labels.id')
      .leftJoin(
        'artists_hired',
        'artists_hired.id',
        'label_artists.artists_hired_id',
      )
      .leftJoin('singles', 'singles.artists_hired_id', 'artists_hired.id')
      .leftJoin('artists', 'artists.id', 'artists_hired.artists_id')
      .where('artists_hired.id', '=', artistId)
      .select([
        'singles.id as id',
        'singles.artists_hired_id',
        'singles.name',
        'singles.listeners',
        'singles.money_earned',
        'artists.firstname as artist_firstname',
        'artists.lastname as artist_lastname',
        'artists.alias as artist_alias',
        'singles.score',
      ])
      .where('artists_hired.id', '=', artistId)
      .where('labels.users_id', '=', userId)
      .execute();

    res.json(singles);
    return;
  } catch (error) {
    console.error('Error fetching singles:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

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
      .selectFrom('users')
      .where('users.id', '=', userId)
      .leftJoin('labels', 'labels.users_id', 'users.id')
      .leftJoin('label_artists', 'label_artists.label_id', 'labels.id')
      .leftJoin(
        'artists_hired',
        'artists_hired.id',
        'label_artists.artists_hired_id',
      )
      .leftJoin('singles', 'singles.artists_hired_id', 'artists_hired.id')
      .leftJoin('artists', 'artists.id', 'artists_hired.artists_id')
      .where('singles.id', '=', singleId)
      .select([
        'singles.artists_hired_id',
        'singles.name',
        'singles.listeners',
        'singles.money_earned',
        'artists.firstname as artist_firstname',
        'artists.lastname as artist_lastname',
        'artists.alias as artist_alias',
        'singles.score',
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
      .selectFrom('users')
      .where('users.id', '=', userId)
      .leftJoin('labels', 'labels.users_id', 'users.id')
      .leftJoin('label_artists', 'label_artists.label_id', 'labels.id')
      .leftJoin(
        'artists_hired',
        'artists_hired.id',
        'label_artists.artists_hired_id',
      )
      .leftJoin('singles', 'singles.artists_hired_id', 'artists_hired.id')
      .leftJoin('artists', 'artists.id', 'artists_hired.artists_id')
      .select([
        'singles.id as id',
        'singles.artists_hired_id',
        'singles.name',
        'singles.listeners',
        'singles.money_earned',
        'artists.firstname as artist_firstname',
        'artists.lastname as artist_lastname',
        'artists.alias as artist_alias',
        'singles.score',
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
  const { artistId, singleName } = req.body;
  const userId = req.userId;
  if (userId === undefined) {
    res.json({
      ok: false,
    });
    return;
  }

  try {
    if (!Number(artistId)) {
      res.status(400).json({ error: 'artistId is required' });
      return;
    }

    const artist = await db
      .selectFrom('users')
      .where('users.id', '=', userId)
      .leftJoin('labels', 'labels.users_id', 'users.id')
      .leftJoin('label_artists', 'label_artists.label_id', 'labels.id')
      .leftJoin(
        'artists_hired',
        'artists_hired.id',
        'label_artists.artists_hired_id',
      )
      .leftJoin('artists', 'artists_hired.artists_id', 'artists.id')
      .leftJoin('genres', 'artists.genres_id', 'genres.id')
      .leftJoin('singles', 'singles.artists_hired_id', 'artists_hired.id')
      .select([
        'artists_hired.id as artists_hired_id',
        'artists.firstname',
        'artists.lastname',
        'artists.alias',
        'genres.id as genre_id',
      ])
      .where('artists_hired.id', '=', artistId)
      .where('singles.name', '=', singleName.trim())
      .execute();

    if (!artist) {
      res.status(404).json({ error: 'Artist not found' });
      return;
    }
    await db
      .insertInto('singles')
      .values({
        artists_hired_id: artistId,
        name: singleName.trim(),
        genres_id: 1,
        exp_value: 0,
        listeners: 0,
        money_earned: 0,
        score: 0,
      })
      .execute();

    return res.status(201).json({ success: true });
  } catch (err) {
    console.error('Insert failed:', err);
    return res.status(500).json({ error: 'Failed to insert single' });
  }
});

export default singlesRouter;
