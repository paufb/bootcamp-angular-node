import type { HydratedDocument, Types } from 'mongoose';
import type { IPost } from './post';
import type { IUser } from './user';

export interface IPostReply {
  body: string;
  user: Types.ObjectId | HydratedDocument<IUser>;
  post: Types.ObjectId | HydratedDocument<IPost>;
}
