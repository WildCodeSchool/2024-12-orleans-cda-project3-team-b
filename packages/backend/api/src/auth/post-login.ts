import argon2 from 'argon2';
import express from 'express';
import * as jose from 'jose';

import { db } from '@app/backend-shared';

const FRONTEND_HOST = process.env.FRONTEND_HOST ?? '';
const JWT_SECRET = process.env.JWT_SECRET;
const secret = new TextEncoder().encode(JWT_SECRET);
const postLoginRouter = express.Router();

postLoginRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await db
    .selectFrom('users')
    .selectAll()
    .where('email', '=', email)
    .executeTakeFirst();

  if (!user) {
    res.json({ message: 'error 404, password or id incorrct' });
    return;
  }

  const isPasswordOk = await argon2.verify(user.password, password);

  if (!isPasswordOk) {
    res.json({ message: 'error 404, password or id incorrect' });
    return;
  }

  const token = await new jose.SignJWT({
    sub: email,
    userId: user.id,
  })
    .setProtectedHeader({
      alg: 'HS256',
    })
    .setIssuedAt()
    .setIssuer(FRONTEND_HOST)
    .setAudience(FRONTEND_HOST)
    .setExpirationTime('60s')
    .sign(secret);

  res.cookie('token', token, {
    httpOnly: true,
    // secure: true,
    // sameSite:'',
    signed: true,
  });
  res.json({
    message: 'user online',
  });
});

export default postLoginRouter;
