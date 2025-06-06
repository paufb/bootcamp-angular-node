import type { Query } from 'mongoose';
import type { ParsedQs } from 'qs';
import type { IPaginationOptions } from '../interfaces/pagination-options.interface';

export const constructPaginationOptions = (query: ParsedQs): IPaginationOptions => {
  const { page_size, page, created_before } = query;
  return {
    pageSize: Number(page_size),
    page: page ? Number(page) : undefined,
    createdBefore: created_before ? String(created_before) : undefined
  };
}

export const addPaginationToQuery = (query: Query<unknown, unknown>, options: NonNullable<IPaginationOptions>): void => {
  const { pageSize, page, createdBefore } = options;
  if (createdBefore) {
    query.where('createdAt').lt(new Date(createdBefore).getTime());
    query.limit(pageSize);
  } else if (page) {
    query.skip(pageSize * page);
    query.limit(pageSize);
  } else {
    query.limit(pageSize);
  };
}
