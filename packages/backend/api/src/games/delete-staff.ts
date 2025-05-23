import { type Request, Router } from 'express';

import { db } from '@app/backend-shared';

const deleteStaffRouter = Router();

deleteStaffRouter.post('/delete-staff', async (req: Request, res) => {
  const { staffId } = req.body;

  try {
    await db
      .deleteFrom('staff_label')
      .where('staff_label.id', '=', staffId)
      .executeTakeFirst();
    res.json({ ok: true });
  } catch (error) {
    console.error('Error hiring staff:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default deleteStaffRouter;
