import { type Request, Router } from 'express';
import { jsonArrayFrom } from 'kysely/helpers/mysql';

import { db } from '@app/backend-shared';

const artistsRouter = Router();

function getArtists(userId: number) {
  return db
    .selectFrom('artists')
    .leftJoin('genres', 'artists.genres_id', 'genres.id')
    .leftJoin('milestones', 'artists.milestones_id', 'milestones.id')
    .select((eb) => [
      'artists.id',
      'artists.alias',
      'artists.firstname',
      'artists.lastname',
      'genres.name as genre',
      'artists.image',
      'artists.milestones_id',
      'milestones.name as milestones_name',
      'artists.notoriety',
      'artists.price',
      jsonArrayFrom(
        eb
          .selectFrom('artists_skills')
          .leftJoin('skills', 'skills.id', 'artists_skills.skills_id')
          .select([
            'skills.id as skillsId',
            'artists_skills.grade',
            'skills.name',
            'artists.id as artistsHiredSkillsId',
          ])
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
            .select('artists_hired.id')
            .whereRef('artists_hired.artists_id', '=', 'artists.id')
            .where('labels.users_id', '=', userId),
        ),
      ),
    );
}

export type Artist = Awaited<
  ReturnType<ReturnType<typeof getArtists>['execute']>
>[number];

artistsRouter.get('/', async (req: Request, res) => {
  const userId = req.userId;
  if (userId === undefined) {
    res.json({
      ok: false,
    });
    return;
  }

  try {
    const artists = await getArtists(userId).execute();
    res.json(artists);
  } catch (error) {
    console.error('Error fetching artists:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

artistsRouter.get('/:id', async (req: Request, res) => {
  const { id } = req.params;
  const userId = req.userId;
  if (userId === undefined) {
    res.json({
      ok: false,
    });
    return;
  }
  try {
    const artist = await getArtists(userId)
      .where('artists.id', '=', Number(id))
      .execute();

    res.json(artist);
  } catch (error) {
    console.error('Error fetching artists:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default artistsRouter;
