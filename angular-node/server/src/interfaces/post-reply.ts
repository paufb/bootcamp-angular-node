import { Types } from 'mongoose';

export interface IPostReply {
  body: string;
  user: Types.ObjectId;
  post: Types.ObjectId;
}
