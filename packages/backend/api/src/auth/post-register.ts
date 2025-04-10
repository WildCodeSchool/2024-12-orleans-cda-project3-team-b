import argon2 from 'argon2';
import express from 'express';

import { db } from '@app/backend-shared';

const postRegisterRouter = express.Router();

postRegisterRouter.post('/register', async (req, res) => {
  const { email, password } = req.body;
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
      message: 'user already use',
    });
  } else {
    await db
      .insertInto('users')
      .values({ email, password: hashPassword })
      .executeTakeFirst();
    res.json({
      message: 'user register',
    });
  }
});

export default postRegisterRouter;
