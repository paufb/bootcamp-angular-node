import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: String,
  body: { type: String, required: true },
  user: { type: mongoose.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

export const Post = mongoose.model('Post', postSchema);
