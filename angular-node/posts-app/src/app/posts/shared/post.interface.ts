import { IUser } from '../../users/shared/user.interface';

export interface IPost {
  _id: string;
  title: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
  user?: IUser;
}
