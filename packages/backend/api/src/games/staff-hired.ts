import { type Request, Router } from 'express';

import { db } from '@app/backend-shared';

const staffHiredRouter = Router();

staffHiredRouter.post('/staff-hire', async (req: Request, res) => {
  const { staffId, labelId, cost } = req.body;
  const userId = req.userId;

  if (userId === undefined) {
    res.json({ ok: false });
  }

  try {
    const staffMember = await db
      .selectFrom('staff')
      .select(['id', 'job', 'bonus', 'price', 'image'])
      .where('staff.id', '=', staffId)
      .executeTakeFirst();

    if (!staffMember) {
      res.status(404).json({ error: 'Staff member not found' });
      return;
    }

    await db
      .insertInto('staff_label')
      .values({
        staff_id: staffId,
        labels_id: labelId,
      })
      .execute();

    const staffLabelEntry = await db
      .selectFrom('staff_label')
      .select('id')
      .where('staff_label.staff_id', '=', staffId)
      .where('staff_label.labels_id', '=', labelId)
      .limit(1)
      .executeTakeFirst();

    if (!staffLabelEntry) {
      res.status(500).json({
        error:
          'Failed to retrieve staff_label.staff ID and staff_label.labels ID',
      });
      return;
    }

    const label = await db
      .selectFrom('labels')
      .select('budget')
      .where('users_id', '=', Number(userId))
      .where('id', '=', labelId)
      .execute();

    if (!label) {
      res.status(404).json({ error: 'Label not found' });
      return;
    }

    if (label[0].budget < cost) {
      res.status(400).json({ error: 'Insufficient budget' });
      return;
    }

    await db
      .updateTable('labels')
      .set((eb) => ({
        budget: eb('budget', '-', cost),
      }))
      .where('users_id', '=', Number(userId))
      .execute();

    res.status(201).json({
      ok: true,
      message: 'Staff hired successfully',
    });
  } catch (error) {
    console.error('Error hiring staff:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default staffHiredRouter;
