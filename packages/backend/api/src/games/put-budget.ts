import { type Request, Router } from 'express';

import { db } from '@app/backend-shared';

const postBuySomethinglRouter = Router();

type BuyingRequestBody = {
  cost: number;
};

postBuySomethinglRouter.put('/buying', async (req: Request, res) => {
  const { cost } = req.body as BuyingRequestBody;
  const userId = req.userId;
  if (userId === undefined) {
    res.json({
      ok: false,
    });
    return;
  }
  try {
    const current = await db
      .selectFrom('labels')
      .select('budget')
      .where('labels.users_id', '=', userId)
      .executeTakeFirst();

    if (current?.budget === undefined || cost < current.budget) {
      return;
    }

    const newBudget = current.budget - cost;

    await db
      .updateTable('labels')
      .set({
        budget: newBudget,
      })
      .where('labels.users_id', '=', userId)
      .execute();
    res.json({
      ok: true,
    });
  } catch (error) {
    res.json({
      message: error,
      ok: false,
    });
  }
});

export default postBuySomethinglRouter;
