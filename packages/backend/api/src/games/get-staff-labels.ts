import { type Request, Router } from 'express';

import { db } from '@app/backend-shared';

const staffLabelsRouter = Router();

function getStaff(userId: number) {
  return db

    .selectFrom('staff_label')
    .leftJoin('labels', 'labels.id', 'staff_label.labels_id')
    .leftJoin('users', 'users.id', 'labels.users_id')
    .leftJoin('staff', 'staff.id', 'staff_label.staff_id')
    .select([
      'staff.image',
      'staff.bonus',
      'staff.job',
      'staff_label.id',
      'staff.price',
    ])
    .where('users.id', '=', userId)
    .where('staff_label.id', 'is not', null)
    .execute();
}
export type StaffLabel = Awaited<ReturnType<typeof getStaff>>[number];

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
