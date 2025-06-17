import { IPaginationOptions } from './pagination-options.interface';

export interface IPostReplyQueryOptions {
  populate?: {
    path: 'user' | 'post';
    populate?: { path: any }[];
  }[];
  sort?: ['createdAt', 'asc' | 'desc'][];
  pagination?: IPaginationOptions;
};
