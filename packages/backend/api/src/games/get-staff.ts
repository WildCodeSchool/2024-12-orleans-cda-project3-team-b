import express from 'express';

import { db } from '@app/backend-shared';

const getStaffRouter = express.Router();

async function getStaff() {
  return db

    .selectFrom('staff')
    .leftJoin('staff_label', 'staff_label.staff_id', 'staff.id')
    .select([
      'staff.id',
      'staff.job',
      'staff.bonus',
      'staff.price',
      'staff.image',
    ])
    .where('staff_label.staff_id', 'is', null)
    .execute();
}
export type Staff = Awaited<ReturnType<typeof getStaff>>[number];

getStaffRouter.get('/staff', async (req, res) => {
  try {
    const staff = await getStaff();
    res.json({ ok: true, staff });
    return;
  } catch (error) {
    console.error('Error fetching artists with genres:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default getStaffRouter;
