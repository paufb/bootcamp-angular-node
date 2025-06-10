import type { HydratedDocument } from 'mongoose';
import type { IPostReplyQueryOptions } from '../interfaces/post-reply-query-options.interface';
import { Post } from '../models/post';
import { PostReply } from '../models/post-reply';
import { IPostReply } from '../interfaces/post-reply';
import { addPaginationToQuery } from '../utils/paginationUtils';

const findPostReplies = (postId: string, options?: IPostReplyQueryOptions): Promise<HydratedDocument<IPostReply>[]> => {
  const query = PostReply.find({ post: postId });
  if (options?.populate) query.populate(options.populate);
  if (options?.sort) query.sort(options.sort);
  if (options?.pagination) addPaginationToQuery(query, options.pagination);
  return query;
}

const findPostReply = (postReplyId: string, options?: IPostReplyQueryOptions): Promise<HydratedDocument<IPostReply> | null> => {
  const query = PostReply.findById(postReplyId);
  if (options?.populate) query.populate(options.populate);
  return query;
}

const createPostReply = async ({ body, userId, postId }: { body: string; userId: string; postId: string; }): Promise<HydratedDocument<IPostReply>> => {
  await Post.findByIdAndUpdate(postId, { $inc: { 'replies.count': 1 } });
  return PostReply.create({ body, user: userId, post: postId });
}

export default {
  findPostReplies,
  findPostReply,
  createPostReply
};
