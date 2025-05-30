import { Request, Response } from 'express';
import mongoose, { Error } from 'mongoose';
import postService from '../services/postService';

const getPosts = async (req: Request, res: Response) => {
  const { pagesize = 0, page = 0 } = req.query;
  const posts = await postService.findPosts({
    select: ['+likes.users'],
    populate: ['user'],
    sort: [[ 'createdAt', 'desc' ]],
    pagination: { pageSize: Number(pagesize), page: Number(page) }
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
  const { pagesize = 0, page = 0 } = req.query;
  const posts = await postService.findPostsByUsername(username, {
    select: ['+likes.users'],
    populate: ['user'],
    sort: [['createdAt', 'desc']],
    pagination: { pageSize: Number(pagesize), page: Number(page) }
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
  const { pagesize = 0, page = 0 } = req.query;
  try {
    const posts = await postService.findFollowingUsersPosts(username, {
      populate: ['user'],
      sort: [[ 'createdAt', 'desc' ]],
      pagination: { pageSize: Number(pagesize), page: Number(page) }
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

export default {
  getPosts,
  getPostsByUsername,
  getFollowingUsersPosts,
  createPost,
  likePost
};
