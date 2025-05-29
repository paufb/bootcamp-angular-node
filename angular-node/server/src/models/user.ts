import mongoose from 'mongoose';
import { hash, verify } from '../utils/cryptoUtils';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  imageUrl: { type: String, default: null },
  following: {
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', select: false }],
    count: { type: Number, default: 0 }
  },
  followers: {
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', select: false }],
    count: { type: Number, default: 0 }
  }
}, {
  timestamps: true,
  methods: {
    verifyPassword(password: string): Promise<boolean> {
      return verify(password, this.password);
    }
  }
});

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
