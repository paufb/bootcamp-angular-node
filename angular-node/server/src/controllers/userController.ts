import { Request, Response } from 'express';
import mongoose, { Error } from 'mongoose';
import userService from '../services/userService';

const getUserByUsername = async (req: Request, res: Response): Promise<void> => {
  const { username } = req.params;
  try {
    const user = await userService.getUserByUsername(username, { select: ['+followers.users'] });
    if (!user) {
      res.sendStatus(404);
      return;
    }
    const userObj = user.toObject();
    const response = {
      ...userObj,
      isFollowedByUser: userObj.followers?.users.some(userObjectId => userObjectId.equals(req.userId))
    };
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

const createUser = async (req: Request, res: Response): Promise<void> => {
  const { name, username, password } = req.body;
  try {
    const newUser = await userService.createUser({ name, username, password });
    res.status(200).json({ username: newUser.username });
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
}

const getFollowersUsers = async (req: Request, res: Response) => {
  const { username } = req.params;
  try {
    const users = await userService.getFollowersUsers(username);
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
}

const getFollowingUsers = async (req: Request, res: Response) => {
  const { username } = req.params;
  try {
    const users = await userService.getFollowingUsers(username);
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
}

const followUser = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;
  const { follow } = req.body;
  const userObjectIdToFollow = new mongoose.Types.ObjectId(userId);
  try {
    await userService.followUser(follow, userObjectIdToFollow, req.userId);
    res.sendStatus(204);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
}

export default {
  getUserByUsername,
  createUser,
  getFollowersUsers,
  getFollowingUsers,
  followUser
};
