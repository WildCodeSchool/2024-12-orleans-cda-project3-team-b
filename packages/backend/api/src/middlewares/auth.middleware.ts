import type { NextFunction, Request, Response } from 'express';
import * as jose from 'jose';

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

const FRONTEND_HOST = process.env.FRONTEND_HOST ?? '';
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const accessTokenSecret = new TextEncoder().encode(ACCESS_TOKEN_SECRET);

const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const refreshTokenSecret = new TextEncoder().encode(REFRESH_TOKEN_SECRET);

export default async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const accessToken = req.signedCookies.accessToken;
  try {
    // check accessToken
    const { payload } = await jose.jwtVerify<{ userId: number }>(
      accessToken,
      accessTokenSecret,
      {
        audience: FRONTEND_HOST,
        issuer: FRONTEND_HOST,
      },
    );

    // accessToken valide

    req.isAuthenticated = true;
    req.userId = payload.userId;
  } catch (atError) {
    // accessToken invalide check refreshToken

    const refreshToken = req.signedCookies.refreshToken;
    try {
      const { payload } = await jose.jwtVerify<{ userId: number }>(
        refreshToken,
        refreshTokenSecret,
        {
          audience: FRONTEND_HOST,
          issuer: FRONTEND_HOST,
        },
      );

      // refreshToken valide

      const newAccessToken = await new jose.SignJWT({
        sub: payload.sub,
        userId: payload.userId,
      })
        .setProtectedHeader({
          alg: 'HS256',
        })
        .setIssuedAt()
        .setIssuer(FRONTEND_HOST)
        .setAudience(FRONTEND_HOST)
        .setExpirationTime('60s')
        .sign(accessTokenSecret);

      res.cookie('accesToken', newAccessToken, {
        httpOnly: true,
        secure: IS_PRODUCTION,
        sameSite: 'strict',
        signed: true,
        maxAge: 60 * 60 * 24 * 7 * 1000,
      });
      req.isAuthenticated = true;
      req.userId = payload.userId;
    } catch (rtError) {
      // refreshToken invalide

      req.isAuthenticated = false;
    }
  }
  next();
}
