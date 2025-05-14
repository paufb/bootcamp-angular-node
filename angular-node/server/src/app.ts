import express, { Request, Response } from 'express';
import { Post } from './models/post.interface';

const app = express();
const port = process.env.PORT || 3000;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Header', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.get('/api/posts', (req: Request, res: Response) => {
  const posts: Post[] = Array.from({ length: 5 }).map((_, index) => ({
    id: index,
    createdAt: new Date(index),
    title: `Post title ${index}`,
    body: `Post body ${index}`
  }));
  res.json(posts);
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
