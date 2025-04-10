import express from 'express';
import * as jose from 'jose';

import { db } from '@app/backend-shared';

const FRONTEND_HOST = process.env.FRONTEND_HOST ?? '';
const JWT_SECRET = process.env.JWT_SECRET;
const secret = new TextEncoder().encode(JWT_SECRET);
const getMeRouter = express.Router();

getMeRouter.get('/me', async (req, res) => {
  const token = req.signedCookies.token;
  try {
    const { payload } = await jose.jwtVerify<{ userId: number }>(
      token,
      secret,
      {
        audience: FRONTEND_HOST,
        issuer: FRONTEND_HOST,
      },
    );
    const userId: number = payload.userId;
    const user = await db
      .selectFrom('users')
      .select(['users.id', 'users.email'])
      .where('users.id', '=', userId)
      .executeTakeFirst();
    if (!user) {
      res.json({
        ok: false,
      });
      return;
    }
    res.json({
      ok: true,
      user,
    });
  } catch (error) {
    res.json({
      ok: error,
    });
  }
});

export default getMeRouter;
