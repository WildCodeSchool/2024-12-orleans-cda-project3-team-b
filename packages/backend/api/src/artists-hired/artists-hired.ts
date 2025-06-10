import { type Request, Router } from 'express';

import { db } from '@app/backend-shared';

const artistsHiredRouter = Router();

artistsHiredRouter.post('/', async (req: Request, res) => {
  const { artistId, labelId, cost } = req.body;
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
      .selectFrom('artists')
      .select(['milestones_id', 'notoriety'])
      .where('artists.id', '=', artistId)
      .executeTakeFirst();

    if (!artist) {
      res.status(404).json({ error: 'Artist not found' });
      return;
    }

    const artistsHiredId = await db
      .insertInto('artists_hired')
      .values({
        artists_id: artistId,
        milestones_id: artist.milestones_id,
        notoriety: artist.notoriety,
      })
      .executeTakeFirst();

    if (!artistsHiredId) {
      res
        .status(500)
        .json({ error: 'Failed to retrieve hired artist_hired ID' });
      return;
    }

    await db
      .insertInto('label_artists')
      .values({
        label_id: labelId,
        artists_hired_id: Number(artistsHiredId.insertId),
      })
      .execute();

    await db
      .updateTable('labels')
      .set((eb) => ({
        budget: eb('budget', '-', cost),
      }))
      .where('users_id', '=', userId)
      .execute();

    res.status(201).json({
      ok: true,
      message: 'Artist hired successfully',
    });
  } catch (error) {
    console.error('Error hiring artist:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

async function getArtistsHired(userId: number) {
  return db
    .selectFrom('artists_hired')
    .leftJoin(
      'label_artists',
      'label_artists.artists_hired_id',
      'artists_hired.id',
    )
    .leftJoin('labels', 'labels.id', 'label_artists.label_id')
    .leftJoin('users', 'users.id', 'labels.users_id')
    .innerJoin('artists', 'artists.id', 'artists_hired.artists_id')
    .leftJoin('milestones', 'milestones.id', 'artists_hired.milestones_id')
    .leftJoin('genres', 'genres.id', 'artists.genres_id')
    .where('labels.users_id', '=', userId)
    .select([
      'artists_hired.id as artist_hired_id',
      'artists_hired.artists_id',
      'artists_hired.milestones_id',
      'artists_hired.notoriety',
      'artists.firstname',
      'artists.lastname',
      'artists.alias',
      'artists.image',
      'milestones.name as milestone_name',
      'genres.name as genre_name',
      'genres.id as genre_id',
    ])
    .execute();
}

export type ArtistHired = Awaited<ReturnType<typeof getArtistsHired>>[number];

artistsHiredRouter.get('/', async (req: Request, res) => {
  const userId = req.userId;
  if (userId === undefined) {
    res.json({
      ok: false,
    });
    return;
  }
  try {
    const artistsHired = await getArtistsHired(userId);

    res.json(artistsHired);
    return;
  } catch (error) {
    console.error('Error fetching artists with genres:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

artistsHiredRouter.get('/:id/singles', async (req: Request, res) => {
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
      .where('artists_hired.id', '=', artistId)
      .execute();

    res.json(singles);
    return;
  } catch (error) {
    console.error('Error fetching singles:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

artistsHiredRouter.get('/:id/albums', async (req: Request, res) => {
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
      .selectFrom('albums')
      .leftJoin('artists_hired', 'artists_hired.id', 'albums.artists_hired_id')
      .leftJoin(
        'label_artists',
        'label_artists.artists_hired_id',
        'artists_hired.id',
      )
      .leftJoin('labels', 'labels.id', 'label_artists.label_id')
      .leftJoin('users', 'users.id', 'labels.users_id')
      .leftJoin('artists', 'artists.id', 'artists_hired.artists_id')
      .where('artists_hired.id', '=', artistId)
      .where('labels.users_id', '=', userId)
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
      .execute();

    res.json(albums);
    return;
  } catch (error) {
    console.error('Error fetching albums:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default artistsHiredRouter;
