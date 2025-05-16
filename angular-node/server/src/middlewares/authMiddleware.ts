import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || '';
const JWT_COOKIE_NAME = process.env.JWT_COOKIE_NAME || '';

export function requireAuthentication(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies[JWT_COOKIE_NAME];
  if (!token) return res.status(401).json({ error: 'Missing access token' });
  try {
    jwt.verify(token, JWT_SECRET);
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
}
