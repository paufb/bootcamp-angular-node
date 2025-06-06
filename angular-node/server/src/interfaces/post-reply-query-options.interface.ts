import { IPaginationOptions } from './pagination-options.interface';

export interface IPostReplyQueryOptions {
  populate?: ('user' | 'post')[];
  pagination?: IPaginationOptions;
};
