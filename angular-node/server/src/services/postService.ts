import { Post } from '../models/post';

interface CreatePostDTO {
  title?: string;
  body: string;
}

const createPost = async (postData: CreatePostDTO) => {
  return await Post.create(postData);
}

const getAllPosts = async () => {
  return await Post.find();
}

export default {
  createPost,
  getAllPosts
};
