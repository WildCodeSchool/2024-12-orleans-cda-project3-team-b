import express from 'express';

import { db } from '@app/backend-shared';

const getXpRouter = express.Router();

getXpRouter.get('/label', async (_req, res) => {
  try {
    const xpData = await db
      .selectFrom('labels')
      .innerJoin('logos', 'logos.id', 'labels.logos_id')
      .innerJoin('staff_label', 'staff_label.labels_id', 'labels.id')
      .innerJoin('staff', 'staff.id', 'staff_label.staff_id')
      .innerJoin('label_artists', 'label_artists.label_id', 'labels.id')
      .innerJoin(
        'artists_hired',
        'artists_hired.id',
        'label_artists.artists_hired_id',
      )
      .innerJoin('artists', 'artists.id', 'artists_hired.artists_id')
      .select([
        'labels.id',
        'labels.name',
        'labels.score_xp',
        'logos.logo_img',
        'labels.notoriety',
        'budget',
        db.fn.sum('staff.exp_value').as('staff_xp'),
        db.fn.sum('artists.exp_value').as('artists_xp'),
      ])
      .groupBy('labels.id')
      .execute();

    const result = [];

    for (const label of xpData) {
      const totalScore =
        Number(label.score_xp) +
        Number(label.staff_xp) +
        Number(label.artists_xp);

      const level = await db
        .selectFrom('levels')
        .select(['levels.id', 'levels.value'])
        .where('levels.value', '<=', totalScore)
        .orderBy('levels.value', 'desc')
        .limit(1)
        .executeTakeFirst();

      result.push({
        id: label.id,
        name: label.name,
        logo_img: label.logo_img,
        total_xp: totalScore,
        level: level?.id ?? 1,
        notoriety: label.notoriety,
        budget: label.budget,
      });
    }

    res.json({ result });
  } catch (error) {
    console.error('Error in /label route:', error);
    res.status(500).json({ ok: false, error: 'Server error' });
  }
});

export default getXpRouter;
