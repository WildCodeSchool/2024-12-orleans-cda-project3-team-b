import { type Request, Router } from 'express';

import { db } from '@app/backend-shared';

const singlesRouter = Router();

function getSingles(userId: number) {
  return (
    db
      .selectFrom('singles')
      .leftJoin('artists_hired', 'singles.artists_hired_id', 'artists_hired.id')
      .leftJoin('artists', 'artists.id', 'artists_hired.artists_id')
      .leftJoin(
        'label_artists',
        'label_artists.artists_hired_id',
        'artists_hired.id',
      )
      .leftJoin('labels', 'labels.id', 'label_artists.label_id')
      .leftJoin('users', 'users.id', 'labels.users_id')
      // .where('labels.users_id', '=', userId)
      .select([
        'singles.id',
        'singles.artists_hired_id',
        'singles.name as name',
        'singles.listeners',
        'singles.money_earned',
        'singles.score',
        'artists.firstname as artist_firstname',
        'artists.lastname as artist_lastname',
        'artists.alias as artist_alias',
      ])
      .where((eb) =>
        eb.not(
          eb.exists(
            eb
              .selectFrom('singles_albums')
              .select('singles_albums.id')
              .whereRef('singles_albums.singles_id', '=', 'singles.id')
              .where('labels.users_id', '=', userId),
          ),
        ),
      )
  );
}
export type Single = Awaited<
  ReturnType<ReturnType<typeof getSingles>['execute']>
>[number];

singlesRouter.get('/', async (req: Request, res) => {
  const userId = req.userId;
  if (userId === undefined) {
    res.json({
      ok: false,
    });
    return;
  }

  try {
    const singles = await getSingles(userId).execute();

    res.json(singles);
    return;
  } catch (error) {
    console.error('Error fetching singles:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

singlesRouter.get('/filter', async (req: Request, res) => {
  const userId = req.userId;
  if (userId === undefined) {
    res.json({
      ok: false,
    });
    return;
  }

  try {
    const singles = await getSingles(userId)
      .orderBy('id', 'desc')
      .executeTakeFirst();

    res.json(singles);
    return;
  } catch (error) {
    console.error('Error fetching singles:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

singlesRouter.post('/', async (req: Request, res) => {
  const { artistHiredId, singleName, genreId, price, skills } = req.body;
  const userId = req.userId;
  if (userId === undefined) {
    res.json({
      ok: false,
    });
    return;
  }
  const totalGrade = skills.reduce(
    (sum: number, skill: { grade: number }) => sum + skill.grade,
    0,
  );
  try {
    if (!Number(artistHiredId)) {
      res.status(400).json({ error: 'artistId is required' });
      return;
    }
    const milestones = await db
      .selectFrom('milestones')
      .leftJoin('artists_hired', 'artists_hired.milestones_id', 'milestones.id')
      .select('milestones.value')
      .where('artists_hired.id', '=', artistHiredId)
      .executeTakeFirst();

    const totalScore = Number(totalGrade) + Number(milestones?.value);

    await db
      .insertInto('singles')
      .values({
        artists_hired_id: artistHiredId,
        name: singleName.trim(),
        genres_id: genreId,
        exp_value: 100,
        listeners: 0,
        money_earned: 2000,
        score: totalScore,
      })
      .execute();

    const moneyEarn = await db
      .selectFrom('singles')
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

    const gain = Number(milestones?.value) / 100;

    const artistHired = await db
      .selectFrom('artists_hired')
      .select('artists_hired.notoriety')
      .where('artists_hired.id', '=', artistHiredId)
      .executeTakeFirst();

    if (!artistHired) {
      res.status(400).json({ error: 'No milestone found' });
      return;
    }
    const currentNotoriety = Number(artistHired.notoriety);
    const newNotoriety = Math.min(Number(currentNotoriety) + Number(gain), 5);

    await db
      .updateTable('artists_hired')
      .set({ notoriety: newNotoriety })
      .where('artists_hired.id', '=', artistHiredId)
      .execute();

    const newMilestone = await db
      .selectFrom('milestones')
      .select('id')
      .where('value', '<=', Number(newNotoriety) * 10)
      .orderBy('id', 'desc')
      .limit(1)
      .executeTakeFirst();

    if (!newMilestone) {
      res.status(400).json({ error: 'No milestone found' });
      return;
    }

    await db
      .updateTable('artists_hired')
      .set({ milestones_id: newMilestone.id })
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
