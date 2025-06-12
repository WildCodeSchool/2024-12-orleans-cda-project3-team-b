import { type Request, Router } from 'express';
import { jsonArrayFrom } from 'kysely/helpers/mysql';

import { db } from '@app/backend-shared';

const artistsHiredRouter = Router();

artistsHiredRouter.post('/', async (req: Request, res) => {
  const { artistId, labelId, cost, skills } = req.body;
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
      .insertInto('artists_hired_skills')
      .values(
        skills.map((skill: { skillsId: number; grade: number }) => ({
          skills_id: skill.skillsId,
          grade: skill.grade,
          artists_hired_id: Number(artistsHiredId.insertId),
        })),
      )
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

function getArtistsHired(userId: number) {
  return db
    .selectFrom('users')
    .leftJoin('labels', 'labels.users_id', 'users.id')
    .leftJoin('label_artists', 'label_artists.label_id', 'labels.id')
    .leftJoin(
      'artists_hired',
      'artists_hired.id',
      'label_artists.artists_hired_id',
    )
    .leftJoin('milestones', 'artists_hired.milestones_id', 'milestones.id')
    .innerJoin('artists', 'artists.id', 'artists_hired.artists_id')
    .leftJoin('genres', 'artists.genres_id', 'genres.id')
    .select((eb) => [
      'artists_hired.id',
      'artists_hired.artists_id',
      'artists_hired.milestones_id',
      'artists_hired.notoriety',
      'artists.firstname',
      'artists.lastname',
      'artists.alias',
      'artists.image',
      // 'artists.notoriety',
      'milestones.name as milestones_name',
      'genres.name as genre',
      'genres.id as genre_id',
      'artists.price',
      jsonArrayFrom(
        eb
          .selectFrom('skills')
          .leftJoin(
            'artists_hired_skills',
            'artists_hired_skills.skills_id',
            'skills.id',
          )
          .select([
            'skills.id as skillsId',
            'artists_hired_skills.grade',
            'skills.name',
            'artists_hired_skills.id as artistsHiredSkillsId',
          ])
          .whereRef(
            'artists_hired_skills.artists_hired_id',
            '=',
            'artists_hired.id',
          ),
      ).as('skills'),
    ])
    .where('users.id', '=', userId);
}

export type ArtistHired = Awaited<
  ReturnType<ReturnType<typeof getArtistsHired>['execute']>
>[number];

artistsHiredRouter.get('/', async (req: Request, res) => {
  const userId = req.userId;
  if (userId === undefined) {
    res.json({
      ok: false,
    });
    return;
  }
  try {
    const artistsHired = await getArtistsHired(userId).execute();
    res.json(artistsHired);
    return;
  } catch (error) {
    console.error('Error fetching artists with genres:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

artistsHiredRouter.get('/:id', async (req: Request, res) => {
  const { id } = req.params;
  const userId = req.userId;
  if (userId === undefined) {
    res.json({
      ok: false,
    });
    return;
  }
  try {
    const artistHired = await getArtistsHired(userId)
      .where('artists_hired.id', '=', Number(id))
      .execute();

    res.json(artistHired);
  } catch (error) {
    console.error('Error fetching artists:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

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
        .leftJoin(
          'artists_hired',
          'singles.artists_hired_id',
          'artists_hired.id',
        )
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
        .leftJoin(
          'artists_hired',
          'artists_hired.id',
          'albums.artists_hired_id',
        )
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
});

export default artistsHiredRouter;
