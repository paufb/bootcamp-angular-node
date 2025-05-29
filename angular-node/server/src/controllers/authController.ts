import { Request, Response } from 'express';
import { Error } from 'mongoose';
import authService from '../services/authService';
import userService from '../services/userService';

const JWT_COOKIE_NAME = process.env.JWT_COOKIE_NAME || '';

const authenticateUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const areCredentialsValid = await authService.areUserCredentialsValid(username, password);
    if (areCredentialsValid) {
      const token = await authService.generateJsonWebToken(username);
      const user = await userService.findUserByUsername(username);
      res.cookie(JWT_COOKIE_NAME, token, { httpOnly: true, sameSite: true });
      res.status(200).json(user);
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

const logUserOut = async (req: Request, res: Response) => {
  res.clearCookie(JWT_COOKIE_NAME);
  res.sendStatus(204);
}

export default {
  authenticateUser,
  logUserOut
};
