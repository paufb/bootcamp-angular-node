import type { HydratedDocument } from 'mongoose';
import type { PostQueryOptions } from '../interfaces/post-query-options.interface';
import type { IPost } from '../interfaces/post';
import { Post } from '../models/post';
import { PostReply } from '../models/post-reply';
import { User } from '../models/user';
import { addPaginationToQuery } from '../utils/paginationUtils';

const createPost = ({ body, userId }: { body: string; userId: string }): Promise<HydratedDocument<IPost>> => {
  return Post.create({ body, user: userId });
}

const findPosts = (options?: PostQueryOptions): Promise<HydratedDocument<IPost>[]> => {
  let query = Post.find();
  if (options?.select) query.select(options.select);
  if (options?.populate) query.populate(options.populate);
  if (options?.sort) query.sort(options.sort);
  if (options?.pagination) addPaginationToQuery(query, options.pagination);
  return query;
}

const findPostsByUsername = async (username: string, options?: PostQueryOptions): Promise<HydratedDocument<IPost>[]> => {
  const user = await User.findOne({ username }, '_id');
  if (!user) throw new Error('User not found');
  let query = Post.find({ user: user._id });
  if (options?.select) query.select(options.select);
  if (options?.populate) query.populate(options.populate);
  if (options?.sort) query.sort(options.sort);
  if (options?.pagination) addPaginationToQuery(query, options.pagination);
  return query;
}

const findLikedPostsByUsername = async (username: string, options?: PostQueryOptions): Promise<HydratedDocument<IPost>[]> => {
  const user = await User.findOne({ username }, '_id');
  if (!user) throw new Error('User not found');
  let query = Post.find({ 'likes.users': user._id });
  if (options?.select) query.select(options.select);
  if (options?.populate) query.populate(options.populate);
  if (options?.sort) query.sort(options.sort);
  if (options?.pagination) addPaginationToQuery(query, options.pagination);
  return query;
}

const findPost = (postId: string, options?: PostQueryOptions): Promise<HydratedDocument<IPost> | null> => {
  let query = Post.findById(postId);
  if (options?.select) query.select(options.select);
  if (options?.populate) query.populate(options.populate);
  return query;
}

const findFollowingUsersPosts = async (username: string, options?: PostQueryOptions): Promise<HydratedDocument<IPost>[]> => {
  const user = await User.findOne({ username }).select('following.users');
  if (!user) throw new Error('User not found');
  let query = Post.find({ user: { $in: user.following.users } });
  if (options?.select) query.select(options.select);
  if (options?.populate) query.populate(options.populate);
  if (options?.sort) query.sort(options.sort);
  if (options?.pagination) addPaginationToQuery(query, options.pagination);
  return query;
}

const deletePost = async (postId: string): Promise<HydratedDocument<IPost> | null> => {
  const post = await Post.findById(postId);
  if (!post) throw new Error('Post not found');
  await PostReply.updateMany({ post: postId }, { post: null });
  return Post.findByIdAndDelete(postId);
}

const likePost = (like: boolean, postId: string, userId: string): Promise<HydratedDocument<IPost> | null> => {
  return Post.findByIdAndUpdate(postId, {
    [like ? '$push' : '$pull']: { 'likes.users': userId },
    $inc: { 'likes.count': like ? 1 : -1 }
  });
}

const isPostLikedBy = (post: HydratedDocument<IPost>, userId: string) => {
  return !!post.likes.users?.some(userObjectId => userObjectId.equals(userId));
}

export default {
  createPost,
  findPosts,
  findPostsByUsername,
  findLikedPostsByUsername,
  findPost,
  findFollowingUsersPosts,
  deletePost,
  likePost,
  isPostLikedBy
};
