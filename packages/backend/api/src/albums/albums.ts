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
      'albums.name as albumName',
      'albums.notoriety_gain',
      'albums.sales',
      'albums.score',
      'artists.alias',
      'artists.firstname',
      'artists.lastname',
      'genres.name',
    ]);
}

export type Album = Awaited<
  ReturnType<ReturnType<typeof getAlbums>['execute']>
>[number];

albumsRouter.get('/', async (req: Request, res) => {
  const userId = req.userId;
  if (userId === undefined) {
    res.json({ ok: false });
    return;
  }

  try {
    const albums = await getAlbums(userId).execute();
    res.json(albums);
  } catch (error) {
    console.error('Error fetching albums:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

albumsRouter.get('/filter', async (req: Request, res) => {
  const userId = req.userId;
  if (userId === undefined) {
    res.json({ ok: false });
    return;
  }

  try {
    const album = await getAlbums(userId)
      .orderBy('id', 'desc')
      .executeTakeFirst();
    res.json(album);
  } catch (error) {
    console.error('Error filtering albums:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

function getSinglesAlbum(albumId: number) {
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
  if (isNaN(albumId)) {
    res.status(400).json({ error: 'Invalid album ID' });
    return;
  }

  try {
    const singlesAlbums = await getSinglesAlbum(albumId);
    res.json(singlesAlbums);
  } catch (error) {
    console.error('Error fetching singles:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

albumsRouter.post('/create', async (req: Request, res) => {
  const userId = req.userId;
  if (userId === undefined) {
    res.json({ ok: false });
    return;
  }

  const { artistHiredId, singleName, singleId, genreId, price } = req.body;

  try {
    if (!Number(artistHiredId)) {
      res.status(400).json({ error: 'artistId is required' });
      return;
    }

    await db.transaction().execute(async (trx) => {
      const bonus = await trx
        .selectFrom('labels')
        .leftJoin('staff_label', 'staff_label.labels_id', 'labels.id')
        .leftJoin('staff', 'staff.id', 'staff_label.staff_id')
        .select([trx.fn.sum('staff.bonus').as('staff_bonus')])
        .where('labels.users_id', '=', userId)
        .executeTakeFirst();

      const albumId = await trx
        .insertInto('albums')
        .values({
          artists_hired_id: artistHiredId,
          name: singleName.trim(),
          genres_id: genreId,
          exp_value: 100,
          sales: 0,
          money_earned: 6000 * ((Number(bonus?.staff_bonus) || 0) / 100 + 1),
          score: 0,
        })
        .executeTakeFirst();

      const moneyEarn = await trx
        .selectFrom('albums')
        .select('money_earned')
        .where('artists_hired_id', '=', artistHiredId)
        .executeTakeFirst();

      const newMoney = Number(moneyEarn?.money_earned ?? 0) - price;

      await trx
        .updateTable('labels')
        .set((eb) => ({
          budget: eb('budget', '+', newMoney),
        }))
        .where('users_id', '=', userId)
        .execute();

      await trx
        .insertInto('singles_albums')
        .values(
          singleId.map((id: number) => ({
            singles_id: id,
            albums_id: albumId.insertId,
          })),
        )
        .execute();

      const milestones = await trx
        .selectFrom('milestones')
        .leftJoin(
          'artists_hired',
          'artists_hired.milestones_id',
          'milestones.id',
        )
        .leftJoin(
          'label_artists',
          'label_artists.artists_hired_id',
          'artists_hired.id',
        )
        .leftJoin('labels', 'labels.id', 'label_artists.label_id')
        .select('milestones.value')
        .where('labels.users_id', '=', userId)
        .executeTakeFirst();

      const gain = Number(milestones?.value ?? 0) / 1000;

      const labelInfo = await trx
        .selectFrom('labels')
        .select('labels.notoriety')
        .where('labels.users_id', '=', userId)
        .executeTakeFirst();

      const currentNotoriety = Number(labelInfo?.notoriety ?? 0);
      const newNotoriety = Math.min(currentNotoriety + gain, 5);

      await trx
        .updateTable('labels')
        .set({ notoriety: newNotoriety })
        .where('users_id', '=', userId)
        .execute();
    });

    res.status(201).json({ success: true });
  } catch (error) {
    console.error('Transaction failed:', error);
    res.status(500).json({ error: 'Failed to insert album' });
  }
});

export default albumsRouter;
