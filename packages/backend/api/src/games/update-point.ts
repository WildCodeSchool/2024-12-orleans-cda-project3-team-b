import { type Request, Router } from 'express';

import { db } from '@app/backend-shared';

const pointRouter = Router();
pointRouter.post('/point', async (req: Request, res) => {
  const userId = req.userId;
  if (userId === undefined) {
    res.json({
      ok: false,
    });
    return;
  }
  const { artistsHiredSkillsId, skills_id, price } = req.body;

  try {
    await db
      .updateTable('artists_hired_skills')
      .set((eb) => ({
        grade: eb('grade', '+', 1),
      }))
      .where('artists_hired_skills.id', '=', artistsHiredSkillsId)
      .where('artists_hired_skills.skills_id', '=', skills_id)
      .execute();

    const budget = await db
      .updateTable('labels')
      .set((eb) => ({
        budget: eb('budget', '-', Number(price)),
      }))
      .where('users_id', '=', userId)
      .executeTakeFirst();

    res.status(200).json({
      message: 'Point ajouté avec succès',
    });
  } catch (error) {
    console.error('Erreur dans /point:', error);
    res.status(500).json({ error: 'Erreur serveur lors de l’ajout du point' });
  }
});

export default pointRouter;
