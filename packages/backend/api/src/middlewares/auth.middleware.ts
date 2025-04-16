import type { NextFunction, Request, Response } from 'express';
import * as jose from 'jose';

const FRONTEND_HOST = process.env.FRONTEND_HOST ?? '';
const ACCES_TOKEN_SECRET = process.env.ACCES_TOKEN_SECRET;
const accesTokenSecret = new TextEncoder().encode(ACCES_TOKEN_SECRET);

const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const refreshTokenSecret = new TextEncoder().encode(REFRESH_TOKEN_SECRET);

export default async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const accesToken = req.signedCookies.accesToken;
  try {
    // check AT token
    const { payload } = await jose.jwtVerify<{ userId: number }>(
      accesToken,
      accesTokenSecret,
      {
        audience: FRONTEND_HOST,
        issuer: FRONTEND_HOST,
      },
    );
    // AT token valide
    req.isAuthenticated = true;
    req.userId = payload.userId;
  } catch (atError) {
    // AT token invalide check RT token
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
      // RT token valide
      const newAccesToken = await new jose.SignJWT({
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
        .sign(accesTokenSecret);

      res.cookie('accesToken', newAccesToken, {
        httpOnly: true,
        // secure: true,
        // sameSite:'',
        signed: true,
      });
      req.isAuthenticated = true;
      req.userId = payload.userId;
    } catch (rtError) {
      // RT token invalide
      req.isAuthenticated = false;
    }
  }
  next();
}
