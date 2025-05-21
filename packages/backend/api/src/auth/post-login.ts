import argon2 from 'argon2';
import express from 'express';
import * as jose from 'jose';

import { db } from '@app/backend-shared';

const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const FRONTEND_HOST = process.env.FRONTEND_HOST ?? '';
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const accessTokenSecret = new TextEncoder().encode(ACCESS_TOKEN_SECRET);

const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const refreshTokenSecret = new TextEncoder().encode(REFRESH_TOKEN_SECRET);

const postLoginRouter = express.Router();

postLoginRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    // get all information in users

    const user = await db
      .selectFrom('users')
      .selectAll()
      .where('email', '=', email)
      .executeTakeFirst();
    if (!user) {
      res.json({ ok: false });
      return;
    }

    // stock all info expect password

    const { password: userPassword, ...restUser } = user;

    // verify  input password = user password

    const isPasswordOk = await argon2.verify(userPassword, password);

    if (!isPasswordOk) {
      res.json({ ok: false });
      return;
    }

    // generate first token

    const accessToken = await new jose.SignJWT({
      sub: email,
      userId: restUser.id,
    })
      .setProtectedHeader({
        alg: 'HS256',
      })
      .setIssuedAt()
      .setIssuer(FRONTEND_HOST)
      .setAudience(FRONTEND_HOST)
      .setExpirationTime('60s')
      .sign(accessTokenSecret);

    // generate second token

    const refreshToken = await new jose.SignJWT({
      sub: email,
      userId: restUser.id,
    })
      .setProtectedHeader({
        alg: 'HS256',
      })
      .setIssuedAt()
      .setIssuer(FRONTEND_HOST)
      .setAudience(FRONTEND_HOST)
      .setExpirationTime('7d')
      .sign(refreshTokenSecret);

    // generate cookie

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: IS_PRODUCTION,
      sameSite: 'strict',
      signed: true,
      maxAge: 60 * 60 * 24 * 7 * 1000,
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: IS_PRODUCTION,
      sameSite: 'strict',
      signed: true,
      maxAge: 60 * 60 * 24 * 7 * 1000,
    });
    res.json({
      ok: true,
      user: restUser,
    });
  } catch (_error) {
    res.json({
      ok: false,
    });
  }
});

export default postLoginRouter;
