import { Types } from 'mongoose';

export interface IPost {
  body: string;
  user: Types.ObjectId;
  likes: {
    users?: Types.ObjectId[];
    count: number;
  };
  replies: {
    count: number;
  };
}
