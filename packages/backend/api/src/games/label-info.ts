import { type Request, Router } from 'express';

import { db } from '@app/backend-shared';

const getLabelInfoRouter = Router();

getLabelInfoRouter.get('/label', async (req: Request, res) => {
  const userId = req.userId;
  if (userId === undefined) {
    res.json({
      ok: false,
    });
    return;
  }

  try {
    const xpData = await db
      .selectFrom('users')
      .where('users.id', '=', Number(userId))
      .leftJoin('labels', 'labels.users_id', 'users.id')
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
        'artists_hired.artists_id',
      )
      .leftJoin(
        'crew_members',
        'crew_members.id',
        'crew_members_hired.crew_members_id',
      )
      .leftJoin('albums', 'albums.artists_hired_id', 'artists_hired.id')
      .leftJoin('albums_marketing', 'albums_marketing.albums_id', 'albums.id')
      .leftJoin('marketing', 'marketing.id', 'albums_marketing.marketing_id')
      .leftJoin(
        'singles_marketing',
        'singles_marketing.marketing_id',
        'marketing.id',
      )
      .leftJoin('singles', 'singles.id', 'singles_marketing.singles_id')
      .leftJoin(
        'artists_hired_skills',
        'artists_hired_skills.artists_hired_id',
        'artists_hired.skills_id',
      )
      .leftJoin('skills', 'skills.id', 'artists_hired_skills.skills_id')
      .leftJoin('artists_skills', 'artists_skills.skills_id', 'skills.id')
      .select([
        'labels.id',
        'labels.name',
        'logos.logo_img',
        'labels.notoriety',
        'labels.budget',
        db.fn.sum('staff.exp_value').as('staff_xp'),
        db.fn.sum('artists.exp_value').as('artists_xp'),
        db.fn.sum('crew_members.exp_value').as('crew_xp'),
        db.fn.sum('albums.exp_value').as('albums_xp'),
        db.fn.sum('marketing.exp_value').as('marketing_xp'),
        db.fn.sum('singles.exp_value').as('singles_xp'),
        db.fn.sum('skills.exp_value').as('skills_xp'),
      ])
      .groupBy('labels.id')
      .executeTakeFirst();

    if (!xpData) {
      res.status(404).json({
        error: 'xpData inconnu',
      });
    }

    const totalScore =
      Number(xpData?.staff_xp) +
      Number(xpData?.artists_xp) +
      Number(xpData?.crew_xp) +
      Number(xpData?.albums_xp) +
      Number(xpData?.marketing_xp) +
      Number(xpData?.singles_xp) +
      Number(xpData?.skills_xp);

    const level = await db
      .selectFrom('levels')
      .select(['levels.id', 'levels.value'])
      .where('levels.value', '<=', totalScore)
      .orderBy('levels.value', 'desc')
      .limit(1)
      .executeTakeFirst();

    res.json({
      name: xpData?.name,
      logo_img: xpData?.logo_img,
      total_xp: totalScore,
      level: level?.id,
      notoriety: xpData?.notoriety,
      budget: xpData?.budget,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ ok: false, error: 'Internal server error' });
  }
});

export default getLabelInfoRouter;
