import express from 'express';

import { db } from '@app/backend-shared';

const getXpRouter = express.Router();

getXpRouter.get('/experience', async (req, res) => {
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
        db.fn.sum('staff.exp_value').as('extra_xp'),
      ])
      .groupBy('labels.id')
      .execute();

    // Calcul final avec total
    const result = xpData.map((label) => ({
      id: label.id,
      name: label.name,
      total_xp: Number(label.score_xp) + Number(label.extra_xp),
      logo: label.logo_img,
    }));

    res.json({ labels: result });
  } catch (error) {
    console.error('Error in /experience route:', error);
    res.status(500).json({ ok: false, error: 'Server error' });
  }
});

export default getXpRouter;
