import express from 'express';

import { db } from '@app/backend-shared';

const artistsHiredSkillsRouter = express.Router();

artistsHiredSkillsRouter.get('/:id', async (req, res) => {
  const artistHiredId = Number(req.params.id);

  try {
    const skills = await db
      .selectFrom('artists_hired_skills')
      .innerJoin('skills', 'artists_hired_skills.skills_id', 'skills.id')
      .leftJoin(
        'artists_hired',
        'artists_hired_skills.artists_hired_id',
        'artists_hired.id',
      )
      .leftJoin(
        'artists_skills',
        'artists_hired.artists_id',
        'artists_skills.artists_id',
      )
      .select([
        'artists_hired_skills.id',
        'artists_hired_skills.grade',
        'skills.name as skill_name',
        'skills.id as skill_id',
      ])
      .where('artists_hired_skills.artists_hired_id', '=', artistHiredId)
      .execute();

    res.json(skills);
  } catch (error) {
    console.error('Error fetching artist hired skills:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default artistsHiredSkillsRouter;
