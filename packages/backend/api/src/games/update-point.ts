import express from 'express';

import { db } from '@app/backend-shared';

const pointRouter = express.Router();
pointRouter.post('/point', async (req, res) => {
  const { artistsHiredSkillsId, skills_id } = req.body;

  try {
    const addPoint = await db
      .updateTable('artists_hired_skills')
      .set((eb) => ({
        grade: eb('grade', '+', 1),
      }))
      .where('artists_hired_skills.id', '=', artistsHiredSkillsId)
      .where('artists_hired_skills.skills_id', '=', skills_id)
      .execute();
    console.log(artistsHiredSkillsId, skills_id);

    res.status(200).json({
      message: 'Point ajouté avec succès',
    });
  } catch (error) {
    console.error('Erreur dans /point:', error);
    res.status(500).json({ error: 'Erreur serveur lors de l’ajout du point' });
  }
});

export default pointRouter;
