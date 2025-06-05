import { type Request, Router } from 'express';

import { db } from '@app/backend-shared';

const staffLabelsRouter = Router();

async function getStaff(userId: number) {
  return db

    .selectFrom('users')
    .where('users.id', '=', userId)
    .leftJoin('labels', 'labels.users_id', 'users.id')
    .leftJoin('staff_label', 'staff_label.labels_id', 'labels.id')
    .leftJoin('staff', 'staff.id', 'staff_label.staff_id')
    .select(['staff.image', 'staff.bonus', 'staff.job', 'staff_label.id'])
    .where('staff_label.id', 'is not', null)
    .execute();
}
export type StaffHired = Awaited<ReturnType<typeof getStaff>>[number];

staffLabelsRouter.get('/staff-labels', async (req: Request, res) => {
  const userId = req.userId;
  if (userId === undefined) {
    res.json({
      ok: false,
    });
    return;
  }
  try {
    const staffLabels = await getStaff(userId);

    res.json({ staffLabels });
  } catch (error) {
    console.error('Error hiring staff:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default staffLabelsRouter;
