import { IPost } from './post.interface';
import { IUser } from './user.interface';

export interface IPostReply {
  _id: string;
  body: string;
  user: IUser;
  post?: IPost | null;
  createdAt: string;
  updatedAt: string;
}
