import { IUser } from './user.interface';

export interface IPost {
  _id: string;
  body: string;
  user?: IUser;
  likes: {
    count: number;
  };
  replies: {
    count: number;
  };
  isLikedByUser: boolean;
  createdAt: string;
  updatedAt: string;
}
