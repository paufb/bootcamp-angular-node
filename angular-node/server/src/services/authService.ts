import type { IDecodedJWTPayload } from '../interfaces/decoded-jwt-payload.interface';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';

const JWT_SECRET = process.env.JWT_SECRET ?? '';

const areUserCredentialsValid = async (username: string, password: string): Promise<boolean> => {
  const user = await User.findOne({ username }).select('+password');
  if (!user) return false;
  return user.verifyPassword(password);
}

const generateJsonWebToken = async (username: string): Promise<string> => {
  const user = await User.findOne({ username });
  if (!user) throw new Error('User not found during JWT generation');
  const payload: IDecodedJWTPayload = { userId: user._id.toString() };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
}

export default {
  areUserCredentialsValid,
  generateJsonWebToken
};
