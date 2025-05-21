import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: String,
  body: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', select: false }],
  likeCount: { type: Number, default: 0 }
}, { timestamps: true });

postSchema.pre('save', function(next) {
  this.likeCount = this.likes.length;
  return next();
});

export const Post = mongoose.model('Post', postSchema);
