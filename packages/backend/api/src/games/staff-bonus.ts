import { type Request, Router } from 'express';

import { db } from '@app/backend-shared';

const staffBonusRouter = Router();

staffBonusRouter.get('/staff-bonus', async (req: Request, res) => {
  const userId = req.userId;
  if (userId === undefined) {
    res.json({
      ok: false,
    });
    return;
  }

  try {
    const staffBouns = await db
      .selectFrom('labels')
      .leftJoin('staff_label', 'staff_label.labels_id', 'labels.id')
      .leftJoin('staff', 'staff.id', 'staff_label.staff_id')
      .select([db.fn.sum('staff.bonus').as('staff_xp')])
      .where('labels.users_id', '=', userId)
      .execute();

    res.json({ ok: true, staffBouns });
  } catch (error) {
    console.error('Error hiring staff:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default staffBonusRouter;
