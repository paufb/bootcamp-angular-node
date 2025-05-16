import { Request, Response } from 'express';
import { Error } from 'mongoose';
import authService from '../services/authService';

const JWT_COOKIE_NAME = process.env.JWT_COOKIE_NAME || '';

const authenticateUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const areCredentialsValid = await authService.areUserCredentialsValid(username, password);
    if (areCredentialsValid) {
      const token = await authService.generateJsonWebToken(username);
      res.cookie(JWT_COOKIE_NAME, token, { httpOnly: true, sameSite: true });
      res.status(200).json({ username });
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

export default {
  authenticateUser
};
