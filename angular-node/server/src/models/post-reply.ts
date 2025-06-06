import type { IPostReply } from '../interfaces/post-reply';
import { type Model, model, Schema } from 'mongoose';

const postReplySchema = new Schema<IPostReply, Model<IPostReply>>({
  body: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  post: { type: Schema.Types.ObjectId, ref: 'Post', required: true }
}, { timestamps: true });

export const PostReply = model('PostReply', postReplySchema);
