import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: String,
  body: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  likes: {
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', select: false }],
    count: { type: Number, default: 0 }
  }
}, { timestamps: true });

export const Post = mongoose.model('Post', postSchema);
