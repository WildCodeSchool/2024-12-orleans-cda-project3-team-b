import { type Request, Router } from 'express';

import { db } from '@app/backend-shared';

const singlesAlbumRouter = Router();

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

export type SinglesAlbums = Awaited<ReturnType<typeof getSinglesAlbum>>[number];

singlesAlbumRouter.get('/:id', async (req: Request, res) => {
  const albumId = Number(req.params.id);

  try {
    const singlesAlbums = await getSinglesAlbum(albumId);

    res.json(singlesAlbums);
    return;
  } catch (error) {
    console.error('Error fetching singles :', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default singlesAlbumRouter;
