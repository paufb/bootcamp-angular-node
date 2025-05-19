import mongoose from 'mongoose';

export interface IDecodedJWTPayload {
  userId: mongoose.Types.ObjectId;
}
