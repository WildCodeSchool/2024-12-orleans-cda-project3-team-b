import { type Request, Router } from 'express';

import { db } from '@app/backend-shared';

const singlesAlbumsRouter = Router();

singlesAlbumsRouter.post('/', async (req: Request, res) => {
  const { singlesId, albumId } = req.body;
  const userId = req.userId;

  if (userId === undefined) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Vérifie que singlesId est bien un tableau de nombres
  if (!Array.isArray(singlesId) || singlesId.some((id) => isNaN(Number(id)))) {
    return res
      .status(400)
      .json({ error: 'singlesId must be an array of numbers' });
  }

  if (!albumId || isNaN(Number(albumId))) {
    return res
      .status(400)
      .json({ error: 'albumId is required and must be a number' });
  }

  try {
    // Préparer les lignes à insérer
    const insertValues = singlesId.map((singleId: number) => ({
      albums_id: albumId,
      singles_id: singleId,
    }));

    // Insertion des liens dans la table de liaison
    await db.insertInto('singles_albums').values(insertValues).execute();

    return res.status(201).json({ success: true });
  } catch (err) {
    console.error('Insert failed:', err);
    return res
      .status(500)
      .json({ error: 'Failed to insert singles into singles_albums' });
  }
});

export default singlesAlbumsRouter;
