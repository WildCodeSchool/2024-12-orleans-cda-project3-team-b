import { type Request, Router } from 'express';

import { db } from '@app/backend-shared';

const albumsRouter = Router();

albumsRouter.get('/:id', async (req: Request, res) => {
  const artistId = Number(req.params.id);
  const userId = req.userId;
  if (userId === undefined) {
    res.json({
      ok: false,
    });
    return;
  }

  try {
    const albums = await db
      .selectFrom('users')
      .where('users.id', '=', userId)
      .leftJoin('labels', 'labels.users_id', 'users.id')
      .leftJoin('label_artists', 'label_artists.label_id', 'labels.id')
      .leftJoin(
        'artists_hired',
        'artists_hired.id',
        'label_artists.artists_hired_id',
      )
      .leftJoin('albums', 'albums.artists_hired_id', 'artists_hired.id')
      .leftJoin('artists', 'artists.id', 'artists_hired.artists_id')
      .where('artists_hired.id', '=', artistId)
      .select([
        'albums.artists_hired_id',
        'albums.name',
        'albums.sales',
        'albums.money_earned',
        'artists.firstname as artist_firstname',
        'artists.lastname as artist_lastname',
        'artists.alias as artist_alias',
        'albums.notoriety_gain',
        'albums.score',
      ])
      .where('artists_hired.id', '=', artistId)
      .where('labels.users_id', '=', userId)
      .execute();

    res.json(albums);
    return;
  } catch (error) {
    console.error('Error fetching albums:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

albumsRouter.post('/create', async (req: Request, res) => {
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
      .leftJoin('albums', 'albums.artists_hired_id', 'artists_hired.id')
      .select([
        'artists_hired.id as artists_hired_id',
        'artists.firstname',
        'artists.lastname',
        'artists.alias',
        'genres.id as genre_id',
      ])
      .where('artists_hired.id', '=', artistId)
      .where('albums.name', '=', singleName.trim())
      .execute();

    if (!artist) {
      res.status(404).json({ error: 'Artist not found' });
      return;
    }
    await db
      .insertInto('albums')
      .values({
        artists_hired_id: artistId,
        name: singleName.trim(),
        genres_id: 1,
        exp_value: 100,
        sales: 0,
        money_earned: 0,
        score: 0,
      })
      .execute();

    return res.status(201).json({ success: true });
  } catch (err) {
    console.error('Insert failed:', err);
    return res.status(500).json({ error: 'Failed to insert album' });
  }
});

export default albumsRouter;
