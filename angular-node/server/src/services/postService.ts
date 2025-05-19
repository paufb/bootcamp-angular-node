import mongoose from 'mongoose';
import { Post } from '../models/post';

interface ICreatePostDTO {
  title?: string;
  body: string;
  user: mongoose.Types.ObjectId;
}

const createPost = async (postData: ICreatePostDTO) => {
  return await Post.create(postData);
}

const getAllPosts = async () => {
  return await Post.find().populate('user');
}

export default {
  createPost,
  getAllPosts
};
