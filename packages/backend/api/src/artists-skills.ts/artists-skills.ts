import express from 'express';

import { db } from '@app/backend-shared';

const artistsSkillsRouter = express.Router();

artistsSkillsRouter.get('/:id', async (req, res) => {
  const artistId = Number(req.params.id);

  try {
    const skills = await db
      .selectFrom('artists_skills')
      .innerJoin('skills', 'artists_skills.skills_id', 'skills.id')
      .select([
        'artists_skills.id',
        'artists_skills.grade',
        'skills.name as skill_name',
        'skills.id as skill_id',
      ])
      .where('artists_skills.artists_id', '=', artistId)
      .execute();

    res.json(skills);
  } catch (error) {
    console.error('Error fetching artist skills:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default artistsSkillsRouter;
