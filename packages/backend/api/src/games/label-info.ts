import express from 'express';

import { db } from '@app/backend-shared';

const getXpRouter = express.Router();

getXpRouter.get('/label', async (_req, res) => {
  try {
    const xpData = await db
      .selectFrom('labels')
      .innerJoin('logos', 'logos.id', 'labels.logos_id')
      .leftJoin('staff_label', 'staff_label.label_id', 'labels.id')
      .leftJoin('staff', 'staff.id', 'staff_label.staff_id')
      .select([
        'labels.id',
        'labels.name',
        'labels.score_xp',
        'logos.logo_img',
        'notoriety',
        'budget',
        db.fn.sum('staff.exp_value').as('extra_xp'),
      ])
      .groupBy('labels.id')
      .execute();

    const result = [];

    for (const label of xpData) {
      const totalScore = Number(label.score_xp) + Number(label.extra_xp);

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
