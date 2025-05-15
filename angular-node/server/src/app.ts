import express, { Request, Response } from 'express';
import { Post } from './models/post.interface';
import { User } from './models/user.interface';

const app = express();
const port = process.env.PORT || 3000;

const posts: Post[] = Array.from({ length: 5 }).map((_, index) => ({
  id: index,
  createdAt: new Date(index),
  title: `Post title ${index}`,
  body: `Post body ${index}`
}));

const users: User[] = Array.from({ length: 5 }).map((_, index) => ({
  id: index,
  profileName: `ProfileName${index}`,
  userName: `username${index}`
}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Header', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.get('/api/posts', (req: Request, res: Response) => {
  let result = posts;
  if (req.query.user) result = result.map((post, index) => ({ ...post, user: users[index] }));
  res.json(result);
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
