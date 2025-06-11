import { type Request, Router } from 'express';

import { db } from '@app/backend-shared';

const albumsRouter = Router();

async function getAlbums(userId: number) {
  return db
    .selectFrom('albums')
    .leftJoin('artists_hired', 'artists_hired.id', 'albums.artists_hired_id')
    .leftJoin('artists', 'artists.id', 'artists_hired.artists_id')
    .leftJoin('genres', 'genres.id', 'artists.genres_id')
    .leftJoin(
      'label_artists',
      'label_artists.artists_hired_id',
      'artists_hired.id',
    )
    .leftJoin('labels', 'labels.id', 'label_artists.label_id')
    .leftJoin('users', 'users.id', 'labels.users_id')
    .where('labels.users_id', '=', userId)
    .select([
      'albums.id',
      'albums.artists_hired_id',
      'albums.exp_value',
      'albums.genres_id',
      'albums.money_earned',
      'albums.name as album_name',
      'albums.notoriety_gain',
      'albums.sales',
      'albums.score',
      'artists.alias as artist_alias',
      'artists.firstname as artist_firstname',
      'artists.lastname as artist_lastname',
      'genres.name as genre_name',
    ])
    .execute();
}

export type Albums = Awaited<ReturnType<typeof getAlbums>>[number];

albumsRouter.get('/', async (req: Request, res) => {
  const userId = req.userId;
  if (userId === undefined) {
    res.json({
      ok: false,
    });
    return;
  }

  try {
    const albums = await getAlbums(userId);

    res.json(albums);
    return;
  } catch (error) {
    console.error('Error fetching albums :', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

albumsRouter.post('/create', async (req: Request, res) => {
  const userId = req.userId;
  if (userId === undefined) {
    res.json({
      ok: false,
    });
    return;
  }
  const { artistHiredId, singleName, singleId, genreId } = req.body;
  try {
    if (!Number(artistHiredId)) {
      res.status(400).json({ error: 'artistId is required' });
      return;
    }

    const bonus = await db
      .selectFrom('labels')
      .leftJoin('staff_label', 'staff_label.labels_id', 'labels.id')
      .leftJoin('staff', 'staff.id', 'staff_label.staff_id')
      .select([db.fn.sum('staff.bonus').as('staff_bonus')])
      .where('labels.users_id', '=', userId)
      .executeTakeFirst();

    const albumId = await db
      .insertInto('albums')
      .values({
        artists_hired_id: artistHiredId,
        name: singleName.trim(),
        genres_id: genreId,
        exp_value: 100,
        sales: 0,
        money_earned: 6000 * (Number(bonus?.staff_bonus) / 100 + 1),
        score: 0,
      })
      .executeTakeFirst();

    await db
      .insertInto('singles_albums')
      .values(
        singleId.map((singleId: number) => ({
          singles_id: singleId,
          albums_id: albumId.insertId,
        })),
      )
      .execute();

    res.status(201).json({ success: true });
    return;
  } catch (err) {
    console.error('Insert failed:', err);
    res.status(500).json({ error: 'Failed to insert album' });
    return;
  }
});

export default albumsRouter;
