import express from 'express';

import { db } from '@app/backend-shared';

const marketingRouter = express.Router();

async function getMarketing() {
  return db
    .selectFrom('marketing')
    .select([
      'marketing.id',
      'marketing.name',
      'marketing.bonus',
      'marketing.price',
      'marketing.image',
    ])
    .execute();
}
export type Marketing = Awaited<ReturnType<typeof getMarketing>>[number];

marketingRouter.get('/', async (req, res) => {
  try {
    const marketing = await getMarketing();
    res.json(marketing);
    return;
  } catch (error) {
    console.error('Error fetching artists:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default marketingRouter;
