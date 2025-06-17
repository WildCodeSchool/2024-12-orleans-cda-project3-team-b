import { type Request, Router } from 'express';

import { db } from '@app/backend-shared';

const pointRouter = Router();
pointRouter.post('/point', async (req: Request, res) => {
  const { artistsHiredSkillsId, skillsId, price } = req.body;
  const userId = req.userId;
  if (userId === undefined) {
    res.json({
      ok: false,
    });
    return;
  }

  try {
    await db
      .updateTable('artists_hired_skills')
      .set((eb) => ({
        grade: eb('grade', '+', 1),
      }))
      .where('artists_hired_skills.id', '=', artistsHiredSkillsId)
      .where('artists_hired_skills.skills_id', '=', skillsId)
      .execute();

    await db
      .updateTable('labels')
      .set((eb) => ({
        budget: eb('budget', '-', Number(price)),
      }))
      .where('labels.users_id', '=', userId)
      .execute();

    res.status(200).json({
      message: 'Point ajouté avec succès',
    });
  } catch (error) {
    console.error('Erreur dans /point:', error);
    res.status(500).json({ error: 'Erreur serveur lors de l’ajout du point' });
  }
});

export default pointRouter;
