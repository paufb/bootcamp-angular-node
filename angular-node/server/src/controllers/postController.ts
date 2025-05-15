import { Request, Response } from 'express';
import { Error } from 'mongoose';
import postService from '../services/postService';

const getPosts = async (req: Request, res: Response) => {
  const posts = await postService.getAllPosts();
  res.json(posts);
}

const createPost = async (req: Request, res: Response) => {
  const { title, body } = req.body;
  try {
    const newPost = await postService.createPost({ title, body });
    res.status(200).json(newPost);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
}

export default {
  getPosts,
  createPost
};
