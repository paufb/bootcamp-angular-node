import type { Request, Response } from 'express';
import type { ParamsDictionary } from 'express-serve-static-core';
import type { Error } from 'mongoose';
import type { DTO } from '../interfaces/dto';
import postReplyService from '../services/postReplyService';
import { constructPaginationOptions } from '../utils/paginationUtils';

const getPostReplies = async (req: Request, res: Response) => {
  const { postId } = req.params;
  try {
    const postReplies = await postReplyService.findPostReplies(postId, {
      populate: ['user'],
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
    const newPostReply = await postReplyService.findPostReply(_id.toString(), { populate: ['user'] });
    res.status(200).json(newPostReply);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
}

export default {
  getPostReplies,
  createPostReply
};
