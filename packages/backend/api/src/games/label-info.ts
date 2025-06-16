import { type Request, Router } from 'express';

import { db } from '@app/backend-shared';

const getLabelInfoRouter = Router();

function getInfoLabel(userId: number) {
  return db
    .selectFrom('users')
    .where('users.id', '=', Number(userId))
    .leftJoin('labels', 'labels.users_id', 'users.id')
    .leftJoin('levels', 'levels.id', 'labels.levels_id')
    .leftJoin('logos', 'logos.id', 'labels.logos_id')
    .leftJoin('staff_label', 'staff_label.labels_id', 'labels.id')
    .leftJoin('staff', 'staff.id', 'staff_label.staff_id')
    .leftJoin('label_artists', 'label_artists.label_id', 'labels.id')
    .leftJoin(
      'artists_hired',
      'artists_hired.id',
      'label_artists.artists_hired_id',
    )
    .leftJoin('artists', 'artists.id', 'artists_hired.artists_id')
    .leftJoin(
      'crew_members_hired',
      'crew_members_hired.artists_id',
      'artists_hired.id',
    )
    .leftJoin(
      'crew_members',
      'crew_members.id',
      'crew_members_hired.crew_members_id',
    )
    .leftJoin('singles', 'singles.artists_hired_id', 'artists_hired.id')
    .leftJoin('singles_marketing', 'singles_marketing.singles_id', 'singles.id')
    .leftJoin('marketing', 'marketing.id', 'singles_marketing.marketing_id')
    .leftJoin('albums', 'albums.artists_hired_id', 'artists_hired.id')
    .leftJoin('albums_marketing', 'albums_marketing.albums_id', 'albums.id')
    .select([
      'labels.id',
      'labels.name',
      'logos.logo_img',
      'labels.notoriety',
      'labels.budget',
      'levels.id as level',
      db.fn.sum('staff.exp_value').as('staff_xp'),
      db.fn.sum('artists.exp_value').as('artists_xp'),
      db.fn.sum('crew_members.exp_value').as('crew_xp'),
      db.fn.sum('albums.exp_value').as('albums_xp'),
      db.fn.sum('marketing.exp_value').as('marketing_xp'),
      db.fn.sum('singles.exp_value').as('singles_xp'),
    ])
    .groupBy('labels.id')
    .execute();
}
export type InfoLabel = Awaited<ReturnType<typeof getInfoLabel>>[number];

getLabelInfoRouter.get('/label', async (req: Request, res) => {
  const userId = req.userId;
  if (userId === undefined) {
    res.json({
      ok: false,
    });
    return;
  }

  try {
    const xpData = await getInfoLabel(userId);
    const labelData = xpData[0];

    if (!Boolean(xpData)) {
      res.status(404).json({
        ok: false,
        error: 'xpData undefiend',
      });
      return;
    }
    const totalScore =
      Number(labelData.staff_xp) +
      Number(labelData.artists_xp) +
      Number(labelData.crew_xp) +
      Number(labelData.albums_xp) +
      Number(labelData.marketing_xp) +
      Number(labelData.singles_xp);
    const level = await db
      .selectFrom('levels')
      .select(['levels.id', 'levels.value'])
      .where('levels.value', '<=', totalScore)
      .orderBy('levels.value', 'desc')
      .limit(1)
      .executeTakeFirst();
    res.json({
      ok: true,
      id: labelData.id,
      name: labelData.name,
      logo_img: labelData.logo_img,
      total_xp: totalScore,
      level: level?.id ?? null,
      notoriety: labelData.notoriety,
      budget: labelData.budget,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ ok: false, error: 'Internal server error' });
  }
});
export default getLabelInfoRouter;
