import type { Request, Response } from 'express';
import type { ParamsDictionary } from 'express-serve-static-core';
import type { Error, HydratedDocument } from 'mongoose';
import type { DTO } from '../interfaces/dto';
import type { IPost } from '../interfaces/post';
import postReplyService from '../services/postReplyService';
import postService from '../services/postService';
import { constructPaginationOptions } from '../utils/paginationUtils';

const getPostReplies = async (req: Request, res: Response) => {
  const { postId } = req.params;
  try {
    const postReplies = await postReplyService.findPostRepliesByPostId(postId, {
      populate: [{ path: 'user' }],
      sort: [['createdAt', 'desc']],
      pagination: constructPaginationOptions(req.query)
    });
    res.status(200).json(postReplies);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

const createPostReply = async (req: Request<ParamsDictionary, any, DTO.ICreatePostReplyDTO>, res: Response) => {
  const { postId } = req.params;
  const { body } = req.body;
  try {
    const { _id } = await postReplyService.createPostReply({ body, userId: req.userId, postId });
    const newPostReply = await postReplyService.findPostReply(_id.toString(), { populate: [{ path: 'user' }] });
    res.status(200).json(newPostReply);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
}

const getUserPostReplies = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const postReplies = await postReplyService.findPostRepliesByUserId(userId, {
      populate: [
        { path: 'user' },
        { path: 'post', populate: [{ path: 'user' }, { path: 'likes.users' }] }
      ],
      sort: [['createdAt', 'desc']],
      pagination: constructPaginationOptions(req.query)
    });
    const response = postReplies.map(postReply => {
      const post = postReply.post as HydratedDocument<IPost>;
      return {
        ...postReply.toObject(),
        post: post
          ? { ...post.toObject(), isLikedByUser: postService.isPostLikedBy(post, req.userId) }
          : null
      };
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

const deletePostReply = async (req: Request, res: Response) => {
  const { postReplyId } = req.params;
  try {
    await postReplyService.deletePostReply(postReplyId);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

export default {
  getPostReplies,
  createPostReply,
  getUserPostReplies,
  deletePostReply
};
