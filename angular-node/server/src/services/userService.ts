import mongoose from 'mongoose';
import { DTO } from '../interfaces/dto';
import { User } from '../models/user'

interface UserQueryOptions {
  select?: ('+following.users' | '+followers.users')[];
}

const createUser = (userData: DTO.ICreateUserDTO) => {
  return User.create(userData);
}

const findUserByUsername = (username: string, options?: UserQueryOptions) => {
  let query = User.findOne({ username });
  if (options?.select) query.select(options.select);
  return query.exec();
}

const findFollowersUsers = async (username: string) => {
  const user = await User.findOne({ username }).select('+followers.users').populate('followers.users');
  return user?.followers?.users;
}

const findFollowingUsers = async (username: string) => {
  const user = await User.findOne({ username }).select('+following.users').populate('following.users');
  return user?.following?.users;
}

const updateUser = async (userId: mongoose.Types.ObjectId, dto: DTO.IUpdateUserDTO) => {
  const updatedUser = await User.findByIdAndUpdate(userId, { name: dto.name, username: dto.username }, { new: true });
  return updatedUser;
}

const followUser = async (follow: boolean, userIdToFollow: mongoose.Types.ObjectId, userId: mongoose.Types.ObjectId) => {
  const countIncrement = follow ? 1 : -1;
  await User.findByIdAndUpdate(userIdToFollow, {
    [follow ? '$push' : '$pull']: { 'followers.users': userId },
    $inc: { 'followers.count': countIncrement }
  });
  await User.findByIdAndUpdate(userId, {
    [follow ? '$push' : '$pull']: { 'following.users': userIdToFollow },
    $inc: { 'following.count': countIncrement }
  });
}

export default {
  createUser,
  findUserByUsername,
  findFollowersUsers,
  findFollowingUsers,
  updateUser,
  followUser
};
