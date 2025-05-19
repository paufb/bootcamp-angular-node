import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { IDecodedJWTPayload } from '../interfaces/decoded-jwt-payload.interface';

const JWT_SECRET = process.env.JWT_SECRET || '';
const JWT_COOKIE_NAME = process.env.JWT_COOKIE_NAME || '';

export const requireAuthentication = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const token = req.cookies[JWT_COOKIE_NAME];
  if (!token) {
    res.status(403).json({ error: 'Missing access token' });
    return;
  }
  try {
    const decodedPayload = jwt.verify(token, JWT_SECRET) as IDecodedJWTPayload;
    req.userId = decodedPayload.userId;
    return next();
  } catch (error) {
    res.status(403).json({ error: 'Invalid access token' });
    return;
  }
}
