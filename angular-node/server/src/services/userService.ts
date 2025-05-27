import mongoose from 'mongoose';
import { User } from '../models/user'

interface CreateUserDTO {
  name: string;
  username: string;
  password: string;
}

interface UserQueryOptions {
  select?: ('+followed.users' | '+follower.users')[];
}

const createUser = (userData: CreateUserDTO) => {
  return User.create(userData);
}

const getUserByUsername = async (username: string, options?: UserQueryOptions) => {
  let query = User.findOne({ username });
  if (options?.select) query.select(options.select);
  return query.exec();
}

const followUser = async (follow: boolean, userIdToFollow: mongoose.Types.ObjectId, userId: mongoose.Types.ObjectId) => {
  const countIncrement = follow ? 1 : -1;
  await User.findByIdAndUpdate(userIdToFollow, {
    [follow ? '$push' : '$pull']: { 'follower.users': userId },
    $inc: { 'follower.count': countIncrement }
  });
  await User.findByIdAndUpdate(userId, {
    [follow ? '$push' : '$pull']: { 'followed.users': userIdToFollow },
    $inc: { 'followed.count': countIncrement }
  });
}

export default {
  createUser,
  getUserByUsername,
  followUser
};
