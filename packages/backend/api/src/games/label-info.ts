import express from 'express';

import { db } from '@app/backend-shared';

const getXpRouter = express.Router();

getXpRouter.get('/label', async (_req, res) => {
  try {
    const xpData = await db
      .selectFrom('labels')
      .innerJoin('logos', 'logos.id', 'labels.logos_id')
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
      .leftJoin('albums', 'albums.artists_id', 'artists_hired.id')
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
        'labels.score_xp',
        'logos.logo_img',
        'labels.notoriety',
        'budget',
        db.fn.sum('staff.exp_value').as('staff_xp'),
        db.fn.sum('artists.exp_value').as('artists_xp'),
        db.fn.sum('crew_members.exp_value').as('crew_xp'),
        db.fn.sum('albums.exp_value').as('albums_xp'),
        db.fn.sum('marketing.exp_value').as('marketing_xp'),
        db.fn.sum('singles.exp_value').as('singles_xp'),
        db.fn.sum('skills.exp_value').as('skills_xp'),
      ])
      .groupBy('labels.id')
      .execute();

    const result = [];

    for (const label of xpData) {
      const totalScore =
        Number(label.staff_xp) +
        Number(label.artists_xp) +
        Number(label.crew_xp) +
        Number(label.albums_xp) +
        Number(label.marketing_xp) +
        Number(label.singles_xp) +
        Number(label.skills_xp);
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
        level: level?.id,
        notoriety: label.notoriety,
        budget: label.budget,
      });
    }

    res.json({ result });
  } catch (error) {
    console.error('Error:', error);
    res.json({ ok: false });
  }
});

export default getXpRouter;
