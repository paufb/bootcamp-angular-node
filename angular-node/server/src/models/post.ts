import type { IPost } from '../interfaces/post';
import { type Model, model, Schema } from 'mongoose';

const postSchema = new Schema<IPost, Model<IPost>>({
  body: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  likes: {
    users: [{ type: Schema.Types.ObjectId, ref: 'User', select: false }],
    count: { type: Number, default: 0 }
  },
  replies: {
    count: { type: Number, default: 0 }
  }
}, { timestamps: true });

export const Post = model('Post', postSchema);
