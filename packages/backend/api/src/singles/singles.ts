import { type Request, Router } from 'express';

import { db } from '@app/backend-shared';

const singlesRouter = Router();

singlesRouter.get('/:id', async (req: Request, res) => {
  const singleId = Number(req.params.id);
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
      .leftJoin('artists_hired', 'singles.artists_hired_id', 'artists_hired.id')
      .leftJoin(
        'label_artists',
        'label_artists.artists_hired_id',
        'artists_hired.id',
      )
      .leftJoin('labels', 'labels.id', 'label_artists.label_id')
      .leftJoin('users', 'users.id', 'labels.users_id')
      .leftJoin('artists', 'artists.id', 'artists_hired.artists_id')
      .where('singles.id', '=', singleId)
      .where('labels.users_id', '=', userId)
      .select([
        'singles.artists_hired_id',
        'singles.name',
        'singles.listeners',
        'singles.money_earned',
        'singles.score',
        'artists.firstname as artist_firstname',
        'artists.lastname as artist_lastname',
        'artists.alias as artist_alias',
      ])
      .execute();

    res.json(singles);
    return;
  } catch (error) {
    console.error('Error fetching singles:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

singlesRouter.get('/', async (req: Request, res) => {
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
      .leftJoin('artists_hired', 'singles.artists_hired_id', 'artists_hired.id')
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
      .execute();

    res.json(singles);
    return;
  } catch (error) {
    console.error('Error fetching singles:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

singlesRouter.post('/', async (req: Request, res) => {
  const { artistHiredId, singleName, genreId } = req.body;
  console.log(req.body);

  const userId = req.userId;
  if (userId === undefined) {
    res.json({
      ok: false,
    });
    return;
  }

  try {
    if (!Number(artistHiredId)) {
      res.status(400).json({ error: 'artistId is required' });
      return;
    }

    await db
      .insertInto('singles')
      .values({
        artists_hired_id: artistHiredId,
        name: singleName.trim(),
        genres_id: genreId,
        exp_value: 100,
        listeners: 0,
        money_earned: 2000,
        score: 0,
      })
      .execute();

    const labels = await db
      .selectFrom('milestones')
      .leftJoin('artists_hired', 'artists_hired.milestones_id', 'milestones.id')
      .select('milestones.value')
      .where('artists_hired.id', '=', artistHiredId)
      .execute();

    const gain = labels.map((label) => {
      const newGain = Number(label.value) / 100;
      return newGain;
    });

    await db
      .updateTable('artists_hired')
      .set((eb) => ({
        notoriety: eb('notoriety', '+', Number(gain)),
      }))
      .where('artists_hired.id', '=', artistHiredId)
      .execute();

    const noto = await db
      .selectFrom('artists_hired')
      .select('notoriety')
      .where('id', '=', artistHiredId)
      .execute();

    const newMilestone = await db
      .selectFrom('milestones')
      .select('id')
      .where('id', '<=', Number(noto[0].notoriety))
      .orderBy('id', 'desc')
      .limit(1)
      .execute();
    console.log(newMilestone);

    await db
      .updateTable('artists_hired')
      .set({ milestones_id: newMilestone[0].id })
      .where('id', '=', artistHiredId)
      .execute();

    res.status(201).json({ success: true });
    return;
  } catch (err) {
    console.error('Insert failed:', err);
    res.status(500).json({ error: 'Failed to insert single' });
    return;
  }
});

export default singlesRouter;
