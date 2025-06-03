import { IUser } from '../../users/shared/user.interface';

export interface IPost {
  _id: string;
  body: string;
  user?: IUser;
  likes: {
    count: number;
  };
  isLikedByUser: boolean;
  createdAt: string;
  updatedAt: string;
}
