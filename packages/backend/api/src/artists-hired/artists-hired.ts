import { type Request, Router } from 'express';
import { jsonArrayFrom } from 'kysely/helpers/mysql';

import { db } from '@app/backend-shared';

import { GetArtistData } from '../games/get-artist-data';

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

    await db
      .insertInto('artists_hired')
      .values({
        artists_id: artistId,
        milestones_id: artist.milestones_id,
        notoriety: artist.notoriety,
      })
      .execute();

    const artistsHiredId = await db
      .selectFrom('artists_hired')
      .select('id')
      .where('artists_hired.artists_id', '=', artistId)
      .orderBy('artists_hired.id', 'desc')
      .limit(1)
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
        artists_hired_id: Number(artistsHiredId.id),
      })
      .execute();

    await db
      .insertInto('artists_hired_skills')
      .values(
        skills.map((skill: { skillsId: number; grade: number }) => ({
          skills_id: skill.skillsId,
          grade: skill.grade,
          artists_hired_id: Number(artistsHiredId.id),
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
async function getArtistsHired(userId: number) {
  return db
    .selectFrom('users')
    .where('users.id', '=', userId)
    .leftJoin('labels', 'labels.users_id', 'users.id')
    .leftJoin('label_artists', 'label_artists.label_id', 'labels.id')
    .leftJoin(
      'artists_hired',
      'artists_hired.id',
      'label_artists.artists_hired_id',
    )
    .innerJoin('artists', 'artists_hired.artists_id', 'artists.id')
    .leftJoin('milestones', 'artists_hired.milestones_id', 'milestones.id')
    .leftJoin('genres', 'artists.genres_id', 'genres.id')
    .select([
      'artists_hired.id as artist_hired_id',
      'artists_hired.artists_id',
      'artists_hired.milestones_id',
      'artists_hired.notoriety',
      'artists.firstname',
      'artists.lastname',
      'artists.alias',
      'artists.image',
      'artists.notoriety',
      'milestones.name as milestone_name',
      'genres.name as genre_name',
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

export type HiredArtist = Awaited<ReturnType<typeof GetArtistData>>[number];

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
    const artistHired = await GetArtistData({
      userId,
      id: Number(id),
      hired: true,
    });

    res.json(artistHired);
  } catch (error) {
    console.error('Error fetching artists:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default artistsHiredRouter;
