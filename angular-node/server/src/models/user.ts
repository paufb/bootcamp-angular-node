import type { IUser, IUserMethods } from '../interfaces/user';
import { type CallbackError, type Model, model, Schema } from 'mongoose';
import { hash, verify } from '../utils/cryptoUtils';

const userSchema = new Schema<IUser, Model<IUser>, IUserMethods>({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  imageUrl: { type: String, default: null },
  following: {
    users: [{ type: Schema.Types.ObjectId, ref: 'User', select: false }],
    count: { type: Number, default: 0 }
  },
  followers: {
    users: [{ type: Schema.Types.ObjectId, ref: 'User', select: false }],
    count: { type: Number, default: 0 }
  }
}, { timestamps: true });

userSchema.method('verifyPassword', function(password: string) {
  return verify(password, this.password!);
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    this.password = await hash(this.password!);
    return next();
  } catch (error) {
    return next(error as CallbackError);
  }
});

export const User = model('User', userSchema);
