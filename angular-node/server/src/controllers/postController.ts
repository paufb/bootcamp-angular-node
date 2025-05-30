import type { ParsedQs } from 'qs';
import { Request, Response } from 'express';
import mongoose, { Error } from 'mongoose';
import postService from '../services/postService';
import { PostQueryOptions } from '../interfaces/post-query-options.interface';

const getPosts = async (req: Request, res: Response) => {
  const posts = await postService.findPosts({
    select: ['+likes.users'],
    populate: ['user'],
    sort: [[ 'createdAt', 'desc' ]],
    pagination: constructPaginationOptions(req.query)
  });
  const response = posts.map(post => {
    const postObj = post.toObject();
    return {
      ...postObj,
      isLikedByUser: postObj.likes?.users.some(userObjectId => userObjectId.equals(req.userId))
    };
  });
  res.status(200).json(response);
}

const getPostsByUsername = async (req: Request, res: Response) => {
  const { username } = req.params;
  const posts = await postService.findPostsByUsername(username, {
    select: ['+likes.users'],
    populate: ['user'],
    sort: [['createdAt', 'desc']],
    pagination: constructPaginationOptions(req.query)
  });
  const response = posts.map(post => {
    const postObj = post.toObject();
    return {
      ...postObj,
      isLikedByUser: postObj.likes?.users.some(userObjectId => userObjectId.equals(req.userId))
    };
  });
  res.status(200).json(response);
}

const getFollowingUsersPosts = async (req: Request, res: Response) => {
  const { username } = req.params;
  try {
    const posts = await postService.findFollowingUsersPosts(username, {
      populate: ['user'],
      sort: [[ 'createdAt', 'desc' ]],
      pagination: constructPaginationOptions(req.query)
    });
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
}

const createPost = async (req: Request, res: Response) => {
  const { title, body } = req.body;
  try {
    const { _id } = await postService.createPost({ title, body, user: req.userId });
    const newPost = await postService.findPost(_id, { populate: ['user'] });
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

const constructPaginationOptions = (query: ParsedQs): PostQueryOptions['pagination'] => {
  const { page_size, page, created_before } = query;
  return {
    pageSize: Number(page_size),
    page: page ? Number(page) : undefined,
    createdBefore: created_before ? String(created_before) : undefined
  };
}

export default {
  getPosts,
  getPostsByUsername,
  getFollowingUsersPosts,
  createPost,
  likePost
};
