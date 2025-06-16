import type { Request, Response } from 'express';
import type { ParamsDictionary } from 'express-serve-static-core';
import type { Error } from 'mongoose';
import type { DTO } from '../interfaces/dto';
import postService from '../services/postService';
import { constructPaginationOptions } from '../utils/paginationUtils';

const getPost = async (req: Request, res: Response): Promise<void> => {
  const { postId } = req.params;
  try {
    const post = await postService.findPost(postId, { select: ['+likes.users'], populate: ['user'] });
    if (!post) {
      res.sendStatus(404);
      return;
    }
    res.status(200).json({
      isLikedByUser: postService.isPostLikedBy(post, req.userId),
      ...post.toObject()
    });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

const getPosts = async (req: Request, res: Response): Promise<void> => {
  const posts = await postService.findPosts({
    select: ['+likes.users'],
    populate: ['user'],
    sort: [[ 'createdAt', 'desc' ]],
    pagination: constructPaginationOptions(req.query)
  });
  const response = posts.map(post => ({
    isLikedByUser: postService.isPostLikedBy(post, req.userId),
    ...post.toObject()
  }));
  res.status(200).json(response);
}

const getPostsByUsername = async (req: Request, res: Response): Promise<void> => {
  const { username } = req.params;
  try {
    const posts = await postService.findPostsByUsername(username, {
      select: ['+likes.users'],
      populate: ['user'],
      sort: [['createdAt', 'desc']],
      pagination: constructPaginationOptions(req.query)
    });
    const response = posts.map(post => ({
      isLikedByUser: postService.isPostLikedBy(post, req.userId),
      ...post.toObject()
    }));
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
}

const getLikedPostsByUsername = async (req: Request, res: Response): Promise<void> => {
  const { username } = req.params;
  try {
    const posts = await postService.findLikedPostsByUsername(username, {
      select: ['+likes.users'],
      populate: ['user'],
      sort: [['createdAt', 'desc']],
      pagination: constructPaginationOptions(req.query)
    });
    const response = posts.map(post => ({
      isLikedByUser: postService.isPostLikedBy(post, req.userId),
      ...post.toObject()
    }));
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
}

const getFollowingUsersPosts = async (req: Request, res: Response): Promise<void> => {
  const { username } = req.params;
  try {
    const posts = await postService.findFollowingUsersPosts(username, {
      select: ['+likes.users'],
      populate: ['user'],
      sort: [[ 'createdAt', 'desc' ]],
      pagination: constructPaginationOptions(req.query)
    });
    const response = posts.map(post => ({
      isLikedByUser: postService.isPostLikedBy(post, req.userId),
      ...post.toObject()
    }));
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
}

const createPost = async (req: Request<ParamsDictionary, any, DTO.ICreatePostDTO>, res: Response): Promise<void> => {
  const { body } = req.body;
  try {
    const { _id } = await postService.createPost({ body, userId: req.userId });
    const newPost = await postService.findPost(_id.toString(), { populate: ['user'] });
    res.status(200).json(newPost);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
}

const deletePost = async (req: Request, res: Response) => {
  const { postId } = req.params;
  try {
    await postService.deletePost(postId);
    res.sendStatus(204);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
}

const likePost = async (req: Request<ParamsDictionary, any, DTO.ILikePostDTO>, res: Response): Promise<void> => {
  const { postId } = req.params;
  const { like } = req.body;
  try {
    await postService.likePost(like, postId, req.userId);
    res.sendStatus(204);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
}

export default {
  getPost,
  getPosts,
  getPostsByUsername,
  getLikedPostsByUsername,
  getFollowingUsersPosts,
  createPost,
  deletePost,
  likePost
};
