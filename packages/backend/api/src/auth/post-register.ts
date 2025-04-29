import argon2 from 'argon2';
import express from 'express';

import { db } from '@app/backend-shared';

const postRegisterRouter = express.Router();

postRegisterRouter.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashPassword = await argon2.hash(password, {
      memoryCost: 19456,
      timeCost: 2,
      parallelism: 1,
    });
    const userExists = await db
      .selectFrom('users')
      .selectAll()
      .where('email', '=', email)
      .executeTakeFirst();

    if (userExists) {
      res.json({
        message: 'email already used',
        ok: false,
      });
    } else {
      await db
        .insertInto('users')
        .values({ email, password: hashPassword })
        .executeTakeFirst();
      res.json({
        message: 'new user registered',
        ok: true,
      });
    }
  } catch {
    res.json({
      ok: false,
    });
  }
});

export default postRegisterRouter;
