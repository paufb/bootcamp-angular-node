import { Types } from 'mongoose';

export interface IUser {
  name: string;
  username: string;
  password?: string;
  imageUrl: string | null;
  following: {
    users?: Types.ObjectId[];
    count: number;
  };
  followers: {
    users?: Types.ObjectId[];
    count: number;
  };
}

export interface IUserMethods {
  verifyPassword(password: string): Promise<boolean>;
}
