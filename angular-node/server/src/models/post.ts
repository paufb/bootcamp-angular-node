import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: String,
  body: { type: String, required: true },
}, { timestamps: true });

export const Post = mongoose.model('Post', postSchema);
