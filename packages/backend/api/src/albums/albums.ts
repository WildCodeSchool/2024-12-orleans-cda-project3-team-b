import express from 'express';

import { db } from '@app/backend-shared';

const albumsRouter = express.Router();

albumsRouter.get('/', async (req, res) => {
  try {
    const albums = await db

      .selectFrom('albums')
      .leftJoin('genres', 'albums.genres_id', 'genres.id')
      .leftJoin('artists', 'albums.artists_id', 'artists.id')
      .select([
        'albums.id',
        'albums.name',
        'albums.sales',
        'albums.money_earned',
        'genres.name as genre_name',
        'albums.artists_id as artists_id',
        'artists.firstname as artist_firstname',
        'artists.lastname as artist_lastname',
        'artists.alias as artist_alias',
        'albums.exp_value',
        'albums.notoriety_gain',
      ])
      .execute();

    res.json(albums);
    return;
  } catch (error) {
    console.error('Error fetching albums:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default albumsRouter;
