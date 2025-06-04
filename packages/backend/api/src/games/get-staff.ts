// import express from 'express';
import { type Request, Router } from 'express';

import { db } from '@app/backend-shared';

const getStaffRouter = Router();

getStaffRouter.get('/staff', async (req: Request, res) => {
  const userId = req.userId;
  if (userId === undefined) {
    res.json({
      ok: false,
    });
    return;
  }
  try {
    const staff = await db
      .selectFrom('staff')
      // .leftJoin('staff_label', 'staff_label.labels_id', 'labels.id')
      // .leftJoin('staff','staff.id','staff_label.staff_id')
      .select([
        'staff.id',
        'staff.job',
        'staff.bonus',
        'staff.price',
        'staff.image',
      ])
      .where((eb) =>
        eb.not(
          eb.exists(
            eb
              .selectFrom('staff_label')
              .leftJoin('labels', 'labels.id', 'staff_label.labels_id')
              .select('staff_label.id')
              .whereRef('staff_label.staff_id', '=', 'staff.id')
              .where('labels.users_id', '=', userId),
          ),
        ),
      )
      .execute();

    res.json({ ok: true, staff });
    return;
  } catch (error) {
    console.error('Error fetching artists with genres:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default getStaffRouter;
