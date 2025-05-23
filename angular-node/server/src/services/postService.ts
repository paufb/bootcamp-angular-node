import mongoose from 'mongoose';
import { Post } from '../models/post';

interface ICreatePostDTO {
  title?: string;
  body: string;
  user: mongoose.Types.ObjectId;
}

interface PostQueryOptions {
  select?: ('+likes')[];
  populate?: ('likes' | 'user')[];
  sort?: ['createdAt', 'asc' | 'desc'][];
}

const createPost = async (postData: ICreatePostDTO) => {
  return await Post.create(postData);
}

const getAllPosts = async (options?: PostQueryOptions) => {
  let query = Post.find();
  if (options?.select) query = query.select(options.select);
  if (options?.populate) query = query.populate(options.populate);
  if (options?.sort) query = query.sort(options.sort);
  return await query.exec();
}

const getPost = async (postId: mongoose.Types.ObjectId, options?: PostQueryOptions) => {
  let query = Post.findById(postId);
  if (options?.select) query = query.select(options.select);
  if (options?.populate) query = query.populate(options.populate);
  return await query.exec();
}

const likePost = async (like: boolean, postId: mongoose.Types.ObjectId, userId: mongoose.Types.ObjectId) => {
  const post = await Post.findById(postId).select('+likes');
  if (!post) throw new Error('Post not found');
  if (like) {
    post.likes.push(userId);
  } else {
    const index = post.likes.indexOf(userId);
    post.likes.splice(index, 1);
  }
  post.save();
}

export default {
  createPost,
  getAllPosts,
  getPost,
  likePost
};
