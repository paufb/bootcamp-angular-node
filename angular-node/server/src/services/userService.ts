import type { HydratedDocument, Types } from 'mongoose';
import type { DTO } from '../interfaces/dto';
import type { IUser } from '../interfaces/user';
import { User } from '../models/user'

interface UserQueryOptions {
  select?: ('+following.users' | '+followers.users')[];
}

const createUser = (dto: DTO.ICreateUserDTO): Promise<HydratedDocument<IUser>> => {
  const { name, username, password, imageFilename } = dto;
  return User.create({
    name, username, password,
    ...(imageFilename && { imageUrl: `/profile-pictures/${imageFilename}` })
    });
}

const findUser = (userId: string): Promise<HydratedDocument<IUser> | null> => {
  return User.findById(userId);
}

const findUserByUsername = (username: string, options?: UserQueryOptions): Promise<HydratedDocument<IUser> | null> => {
  let query = User.findOne({ username });
  if (options?.select) query.select(options.select);
  return query;
}

const findFollowersUsers = async (username: string): Promise<Types.ObjectId[] | undefined> => {
  const user = await User.findOne({ username }).select('+followers.users').populate('followers.users');
  return user?.followers.users;
}

const findFollowingUsers = async (username: string): Promise<Types.ObjectId[] | undefined> => {
  const user = await User.findOne({ username }).select('+following.users').populate('following.users');
  return user?.following.users;
}

const updateUser = async (userId: string, dto: DTO.IUpdateUserDTO): Promise<HydratedDocument<IUser> | null> => {
  const updatedUser = await User.findByIdAndUpdate(userId, { name: dto.name, username: dto.username }, { new: true });
  return updatedUser;
}

const followUser = async (follow: boolean, userIdToFollow: string, userId: string): Promise<void> => {
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

const isUserFollowedBy = (currentUser: HydratedDocument<IUser>, userId: string): boolean => {
  return !!currentUser.followers.users?.some(userObjectId => userObjectId.equals(userId));
}

export default {
  createUser,
  findUser,
  findUserByUsername,
  findFollowersUsers,
  findFollowingUsers,
  updateUser,
  followUser,
  isUserFollowedBy
};
