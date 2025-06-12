import { type Request, Router } from 'express';

import { db } from '@app/backend-shared';

const albumsRouter = Router();

function getAlbums(userId: number) {
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
      'albums.name as name',
      'albums.notoriety_gain',
      'albums.sales',
      'albums.score',
      'artists.alias as artist_alias',
      'artists.firstname as artist_firstname',
      'artists.lastname as artist_lastname',
      'genres.name as genre_name',
    ]);
}

export type Album = Awaited<
  ReturnType<ReturnType<typeof getAlbums>['execute']>
>[number];

albumsRouter.get('/', async (req: Request, res) => {
  const userId = req.userId;
  if (userId === undefined) {
    res.json({
      ok: false,
    });
    return;
  }

  try {
    const albums = await getAlbums(userId).execute();

    res.json(albums);
    return;
  } catch (error) {
    console.error('Error fetching albums :', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

albumsRouter.get('/filter', async (req: Request, res) => {
  const userId = req.userId;
  if (userId === undefined) {
    res.json({
      ok: false,
    });
    return;
  }

  try {
    const albums = await getAlbums(userId)
      .orderBy('id', 'desc')
      .executeTakeFirst();

    res.json(albums);
    return;
  } catch (error) {
    console.error('Error fetching albums :', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

async function getSinglesAlbum(albumId: number) {
  return db
    .selectFrom('singles_albums')
    .leftJoin('singles', 'singles.id', 'singles_albums.singles_id')
    .leftJoin('albums', 'albums.id', 'singles_albums.albums_id')
    .where('singles_albums.albums_id', '=', albumId)
    .select([
      'singles_albums.singles_id',
      'singles_albums.albums_id',
      'albums.name as album_name',
      'singles.name as single_name',
      'albums.money_earned',
    ])
    .execute();
}

export type SingleAlbum = Awaited<ReturnType<typeof getSinglesAlbum>>[number];

albumsRouter.get('/:albumId/singles', async (req: Request, res) => {
  const albumId = Number(req.params.albumId);

  try {
    const singlesAlbums = await getSinglesAlbum(albumId);

    res.json(singlesAlbums);
    return;
  } catch (error) {
    console.error('Error fetching singles :', error);
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
  const { artistHiredId, singleName, singleId, genreId, price } = req.body;
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

    const moneyEarn = await db
      .selectFrom('albums')
      .select('money_earned')
      .where('artists_hired_id', '=', artistHiredId)
      .executeTakeFirst();

    const newMoney = Number(moneyEarn?.money_earned) - price;

    await db
      .updateTable('labels')
      .set((eb) => ({
        budget: eb('budget', '+', Number(newMoney)),
      }))
      .where('users_id', '=', userId)
      .execute();

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
