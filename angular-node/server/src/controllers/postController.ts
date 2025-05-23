import { Request, Response } from 'express';
import mongoose, { Error } from 'mongoose';
import postService from '../services/postService';

const getPosts = async (req: Request, res: Response) => {
  const posts = await postService.getAllPosts({ select: ['+likes'], populate: ['user'] });
  const response = posts.map(post => {
    const { likes, ...rest } = post.toObject();
    return {
      ...rest,
      isLikedByUser: likes.some(userObjectId => userObjectId.equals(req.userId))
    };
  });
  res.json(response);
}

const createPost = async (req: Request, res: Response) => {
  const { title, body } = req.body;
  try {
    const { _id } = await postService.createPost({ title, body, user: req.userId });
    const newPost = await postService.getPost(_id, { populate: ['user'] });
    res.status(200).json(newPost);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
}

const likePost = async (req: Request, res: Response) => {
  const { postId } = req.params;
  const { like } = req.body;
  const postObjectId = new mongoose.Types.ObjectId(postId); 
  try {
    await postService.likePost(like, postObjectId, req.userId);
    res.sendStatus(204);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
}

export default {
  getPosts,
  createPost,
  likePost
};
