import mongoose from 'mongoose';
import { hash } from '../utils/cryptoUtils';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false }
}, { timestamps: true });

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const hashedPassword = await hash(this.password);
    this.password = hashedPassword;
    return next();
  } catch (error) {
    return next(error as mongoose.CallbackError);
  }
});

export const User = mongoose.model('User', userSchema);
