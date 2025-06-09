import type { Request, Response } from 'express';
import type { ParamsDictionary } from 'express-serve-static-core';
import type { Error } from 'mongoose';
import type { DTO } from '../interfaces/dto';
import userService from '../services/userService';

const getUser = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;
  try {
    const user = await userService.findUser(userId);
    if (!user) {
      res.sendStatus(404);
      return;
    }
    res.status(200).json({
      isFollowedByUser: userService.isUserFollowedBy(user, req.userId),
      ...user.toObject()
    });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

const getUserByUsername = async (req: Request, res: Response): Promise<void> => {
  const { username } = req.params;
  try {
    const user = await userService.findUserByUsername(username, { select: ['+followers.users'] });
    if (!user) {
      res.sendStatus(404);
      return;
    }
    res.status(200).json({
      isFollowedByUser: userService.isUserFollowedBy(user, req.userId),
      ...user.toObject()
    });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

const createUser = async (req: Request<ParamsDictionary, any, DTO.ICreateUserDTO>, res: Response): Promise<void> => {
  const { name, username, password } = req.body;
  const profilePicture = req.file;
  try {
    const newUser = await userService.createUser({
      name, username, password,
      ...(profilePicture && { imageFilename: profilePicture.filename })
    });
    res.status(200).json({ username: newUser.username });
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
}

const getFollowersUsers = async (req: Request, res: Response): Promise<void> => {
  const { username } = req.params;
  try {
    const users = await userService.findFollowersUsers(username);
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
}

const getFollowingUsers = async (req: Request, res: Response): Promise<void> => {
  const { username } = req.params;
  try {
    const users = await userService.findFollowingUsers(username);
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
}

const editUser = async (req: Request<ParamsDictionary, any, DTO.IUpdateUserDTO>, res: Response): Promise<void> => {
  const { userId } = req.params;
  try {
    const user = await userService.updateUser(userId, req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
}

const followUser = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;
  const { follow } = req.body;
  try {
    await userService.followUser(follow, userId, req.userId);
    res.sendStatus(204);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
}

export default {
  getUser,
  getUserByUsername,
  createUser,
  getFollowersUsers,
  getFollowingUsers,
  editUser,
  followUser
};
