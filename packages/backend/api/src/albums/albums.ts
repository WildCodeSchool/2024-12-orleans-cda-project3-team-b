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

albumsRouter.post('/', async (req, res) => {
  const { artistId } = req.body;

  try {
    if (!Number(artistId)) {
      res.status(400).json({ error: 'artistId is required' });
      return;
    }

    const artist = await db
      .selectFrom('artists')
      .select(['milestones_id', 'notoriety'])
      .where('artists.id', '=', artistId)
      .executeTakeFirst();

    if (!artist) {
      res.status(404).json({ error: 'Artist not found' });
      return;
    }

    await db
      .insertInto('artists_hired')
      .values({
        artists_id: artistId,
        milestones_id: artist.milestones_id,
        notoriety: artist.notoriety,
      })

      .execute();

    res.status(201).json({ message: 'Artist hired successfully' });
  } catch (error) {
    console.error('Error hiring artist:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

albumsRouter.post('/create', async (req, res) => {
  const { artistId } = req.body;

  try {
    if (!Number(artistId)) {
      res.status(400).json({ error: 'artistId is required' });
      return;
    }

    const artist = await db
      .selectFrom('artists')
      .select(['milestones_id', 'notoriety'])
      .where('artists.id', '=', artistId)
      .executeTakeFirst();

    if (!artist) {
      res.status(404).json({ error: 'Artist not found' });
      return;
    }

    await db
      .insertInto('artists_hired')
      .values({
        artists_id: artistId,
        milestones_id: artist.milestones_id,
        notoriety: artist.notoriety,
      })

      .execute();

    res.status(201).json({ message: 'Artist hired successfully' });
  } catch (error) {
    console.error('Error hiring artist:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default albumsRouter;
