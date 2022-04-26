import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

import AppError from '../errors/appError';

export function ensureAuthentication(req: Request, res: Response, next: NextFunction) {
  const authToken = req.headers.authorization;

  if (!authToken) {
    throw new AppError('Token is missing', 401);
  }

  //Bearer 12312h3b1h3b1gv13123v23
  const [, token] = authToken.split(" ");

  try {
    verify(token, process.env.AUTH_SECRET);
    return next();

  } catch (err) {
    throw new AppError('Token is invalid', 401);
  }
}
