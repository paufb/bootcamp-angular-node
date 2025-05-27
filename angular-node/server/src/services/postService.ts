import mongoose from 'mongoose';
import { Post } from '../models/post';
import { User } from '../models/user';

interface ICreatePostDTO {
  title?: string;
  body: string;
  user: mongoose.Types.ObjectId;
}

interface PostQueryOptions {
  select?: ('+likes.users')[];
  populate?: ('user' | 'likes.users')[];
  sort?: ['createdAt', 'asc' | 'desc'][];
}

const createPost = async (postData: ICreatePostDTO) => {
  return Post.create(postData);
}

const findPosts = async (options?: PostQueryOptions) => {
  let query = Post.find();
  if (options?.select) query.select(options.select);
  if (options?.populate) query.populate(options.populate);
  if (options?.sort) query.sort(options.sort);
  return query.exec();
}

const findPostsByUsername = async (username: string, options?: PostQueryOptions) => {
  const user = await User.findOne({ username }, '_id');
  if (!user) throw new Error('User not found');
  let query = Post.find({ user: user._id });
  if (options?.select) query.select(options.select);
  if (options?.populate) query.populate(options.populate);
  if (options?.sort) query.sort(options.sort);
  return query.exec();
}

const findPost = async (postId: mongoose.Types.ObjectId, options?: PostQueryOptions) => {
  let query = Post.findById(postId);
  if (options?.select) query.select(options.select);
  if (options?.populate) query.populate(options.populate);
  return query.exec();
}

const likePost = async (like: boolean, postId: mongoose.Types.ObjectId, userId: mongoose.Types.ObjectId) => {
  return Post.findByIdAndUpdate(postId, {
    [like ? '$push' : '$pull']: { 'likes.users': userId },
    $inc: { 'likes.count': like ? 1 : -1 }
  });
}

export default {
  createPost,
  findPosts,
  findPostsByUsername,
  findPost,
  likePost
};
