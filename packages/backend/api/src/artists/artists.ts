// import express from 'express';
import { type Request, Router } from 'express';

import { db } from '@app/backend-shared';

const artistsRouter = Router();

artistsRouter.get('/', async (req: Request, res) => {
  const userId = req.userId;
  if (userId === undefined) {
    res.json({
      ok: false,
    });
    return;
  }

  try {
    const artists = await db
      .selectFrom('artists')
      .leftJoin('genres', 'artists.genres_id', 'genres.id')
      .leftJoin('milestones', 'artists.milestones_id', 'milestones.id')
      .select([
        'artists.id as artist_id',
        'artists.firstname',
        'artists.lastname',
        'artists.alias',
        'artists.notoriety',
        'artists.price',
        'artists.image',
        'genres.name as genre_name',
        'milestones.name as milestone_name',
        'artists.exp_value',
      ])
      .where((eb) =>
        eb.not(
          eb.exists(
            eb
              .selectFrom('artists_hired')
              .leftJoin(
                'label_artists',
                'label_artists.artists_hired_id',
                'artists_hired.id',
              )
              .leftJoin('labels', 'labels.id', 'label_artists.label_id')
              .select('artists_hired.artists_id')
              .whereRef('artists_hired.artists_id', '=', 'artists.id')
              .where('labels.users_id', '=', userId),
          ),
        ),
      )
      .execute();

    res.json(artists);
    return;
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
      .where('artists.id', '=', Number(id))
      .execute();

    res.json(artists);
    return;
  } catch (error) {
    console.error('Error fetching artists:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default artistsRouter;
