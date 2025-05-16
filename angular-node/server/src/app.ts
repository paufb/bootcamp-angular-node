import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import path from 'path';
import authRoutes from './routes/authRoutes';
import postRoutes from './routes/postRoutes';
import userRoutes from './routes/userRoutes'

const app = express();
const PORT = process.env.EXPRESS_PORT ?? 3000;
const MONGODB_DB_URI = process.env.MONGODB_DB_URI ?? '';

mongoose.connect(MONGODB_DB_URI);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);

app.use(express.static(path.join(__dirname, '..', 'browser')));
app.use('*path', (_req: Request, res: Response) => {
  res.sendFile(path.resolve('browser/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
