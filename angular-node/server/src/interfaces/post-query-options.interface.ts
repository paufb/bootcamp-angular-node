export interface PostQueryOptions {
  select?: ('+likes.users')[];
  populate?: ('user' | 'likes.users')[];
  sort?: ['createdAt', 'asc' | 'desc'][];
  pagination?: {
    pageSize: number;
    page?: number;
    createdBefore?: string;
  }
}
