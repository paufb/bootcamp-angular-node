import { IPaginationOptions } from './pagination-options.interface';

export interface PostQueryOptions {
  select?: ('+likes.users')[];
  populate?: ('user' | 'likes.users')[];
  sort?: ['createdAt', 'asc' | 'desc'][];
  pagination?: IPaginationOptions;
}
