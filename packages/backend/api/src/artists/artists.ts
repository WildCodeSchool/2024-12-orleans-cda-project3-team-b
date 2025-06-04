// import express from 'express';
import { type Request, Router } from 'express';
import { jsonArrayFrom } from 'kysely/helpers/mysql';

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
      .select((eb) => [
        'artists.id as artist_id',
        'artists.alias',
        'artists.firstname',
        'artists.lastname',
        'genres.name as genre',
        'artists.image',
        'artists.milestones_id',
        'artists.notoriety',
        'artists.price',
        jsonArrayFrom(
          eb
            .selectFrom('artists_skills')
            .leftJoin('skills', 'skills.id', 'artists_skills.skills_id')
            .select(['skills.id as skillsId', 'artists_skills.grade'])
            .whereRef('artists_skills.artists_id', '=', 'artists.id'),
        ).as('skills'),
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
  } catch (error) {
    console.error('Error fetching artists:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

function getArtist(id: number) {
  return db
    .selectFrom('artists')
    .leftJoin('genres', 'genres.id', 'artists.genres_id')
    .leftJoin('milestones', 'milestones.id', 'artists.milestones_id')
    .select((eb) => [
      'artists.id',
      'artists.firstname',
      'artists.lastname',
      'artists.alias',
      'genres.name',
      'artists.image',
      'milestones.name as milestones',
      'artists.notoriety',
      'artists.price',
      jsonArrayFrom(
        eb
          .selectFrom('artists_skills')
          .leftJoin('skills', 'skills.id', 'artists_skills.skills_id')
          .leftJoin(
            'artists_hired_skills',
            'artists_hired_skills.skills_id',
            'skills.id',
          )
          .select([
            'skills.name',
            'artists_skills.grade',
            'artists_skills.skills_id',
            'artists_hired_skills.id as artistsHiredSkillsId',
          ])
          .whereRef('artists_skills.artists_id', '=', 'artists.id'),
      ).as('skills'),
    ])
    .where('artists.id', '=', Number(id))
    .execute();
}

export type Artist = Awaited<ReturnType<typeof getArtist>>[number];

artistsRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const artist = await getArtist(Number(id));

    res.json(artist);
  } catch (error) {
    console.error('Error fetching artists:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default artistsRouter;
