import express from 'express';
import { jsonArrayFrom } from 'kysely/helpers/mysql';

import { db } from '@app/backend-shared';

const artistsRouter = express.Router();

artistsRouter.get('/', async (req, res) => {
  try {
    const artists = await db

      .selectFrom('artists')
      .leftJoin('genres', 'artists.genres_id', 'genres.id')
      .leftJoin('milestones', 'artists.milestones_id', 'milestones.id')
      .leftJoin('artists_hired', 'artists.id', 'artists_hired.artists_id')
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
      .where('artists_hired.artists_id', 'is', null)
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
    const artist = await db
      .selectFrom('artists')
      .leftJoin('genres', 'genres.id', 'artists.genres_id')
      .select((eb) => [
        'artists.id',
        'artists.firstname',
        'artists.lastname',
        'genres.name',
        'artists.image',
        'artists.milestones_id',
        'artists.notoriety',
        'artists.price',
        jsonArrayFrom(
          eb
            .selectFrom('artists_skills')
            .leftJoin('skills', 'skills.id', 'artists_skills.skills_id')
            .select(['skills.name', 'skills.grade'])
            .whereRef('artists_skills.artists_id', '=', 'skills.id'),
        ).as('skills'),
      ])
      .where('artists.id', '=', Number(id))
      .execute();

    res.json({ artist });
    return;
  } catch (error) {
    console.error('Error fetching artists:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default artistsRouter;
