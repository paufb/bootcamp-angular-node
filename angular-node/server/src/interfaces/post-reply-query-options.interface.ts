import { IPaginationOptions } from './pagination-options.interface';

export interface IPostReplyQueryOptions {
  populate?: ('user' | 'post')[];
  sort?: ['createdAt', 'asc' | 'desc'][];
  pagination?: IPaginationOptions;
};
