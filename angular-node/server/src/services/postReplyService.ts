import type { HydratedDocument } from 'mongoose';
import type { IPostReplyQueryOptions } from '../interfaces/post-reply-query-options.interface';
import { PostReply } from '../models/post-reply';
import { IPostReply } from '../interfaces/post-reply';
import { addPaginationToQuery } from '../utils/paginationUtils';

const findPostReplies = (postId: string, options?: IPostReplyQueryOptions): Promise<HydratedDocument<IPostReply>[]> => {
  const query = PostReply.find({ post: postId });
  if (options?.populate) query.populate(options.populate);
  if (options?.pagination) addPaginationToQuery(query, options.pagination);
  return query;
}

const createPostReply = ({ body, userId, postId }: { body: string; userId: string; postId: string; }): Promise<HydratedDocument<IPostReply>> => {
  return PostReply.create({ body, user: userId, post: postId });
}

export default {
  findPostReplies,
  createPostReply
};
