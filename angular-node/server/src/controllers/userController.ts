import { Request, Response } from 'express';
import { Error } from 'mongoose';
import userService from '../services/userService';

const getUserByUsername = async (req: Request, res: Response) => {
  const { username } = req.params;
  try {
    const user = await userService.getUserByUsername(username);
    if (user)
      res.status(200).json(user);
    else
      res.sendStatus(404);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

const createUser = async (req: Request, res: Response) => {
  const { name, username, password } = req.body;
  try {
    const newUser = await userService.createUser({ name, username, password });
    res.status(200).json({ username: newUser.username });
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
}

export default {
  getUserByUsername,
  createUser
};
