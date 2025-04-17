import { type Request, Router } from 'express';

import { db } from '@app/backend-shared';

import authGuardMiddleware from '@/middlewares/auth.guard';

const getMeRouter = Router();

getMeRouter.get('/me', authGuardMiddleware, async (req: Request, res) => {
  const userId = req.userId;
  if (userId === undefined) {
    res.json({
      userId: false,
    });
    return;
  }

  try {
    const user = await db
      .selectFrom('users')
      .select(['users.id', 'users.email'])
      .where('users.id', '=', userId)
      .executeTakeFirst();
    if (!user) {
      res.json({
        user: false,
      });
      return;
    }
    res.json({
      ok: true,
      user,
    });
  } catch (_error) {
    res.json({
      user: false,
    });
  }
});

export default getMeRouter;
