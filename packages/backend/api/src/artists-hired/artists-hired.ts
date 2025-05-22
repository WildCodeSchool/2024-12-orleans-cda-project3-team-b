import { type Request, Router } from 'express';

import { db } from '@app/backend-shared';

const artistsHiredRouter = Router();
type BuyingRequestBody = {
  cost: number;
};

artistsHiredRouter.post('/', async (req: Request, res) => {
  const { artistId, labelId } = req.body;
  const { cost } = req.body as BuyingRequestBody;
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

    res.status(201).json({ message: 'Artist hired successfully' });

    await db
      .insertInto('label_artists')
      .values({
        label_id: labelId,
        artists_hired_id: artistId,
      })
      .execute();

    const result = await db
      .updateTable('labels')
      .set((eb) => ({
        budget: eb('budget', '-', cost),
      }))
      .where('labels.users_id', '=', userId)
      .where('budget', '>=', cost)
      .execute();

    res.json({
      ok: true,
      result,
    });
  } catch (error) {
    console.error('Error hiring artist:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

artistsHiredRouter.get('/', async (req, res) => {
  try {
    const artistsHired = await db
      .selectFrom('artists_hired')
      .leftJoin('artists', 'artists_hired.artists_id', 'artists.id')
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

    res.json(artistsHired);
    return;
  } catch (error) {
    console.error('Error fetching artists with genres:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default artistsHiredRouter;
