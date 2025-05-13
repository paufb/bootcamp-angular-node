import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CreatePostDTO } from './create-post-dto.interface';
import { Post } from './post.interface';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private readonly posts: Post[] = Array(5).fill(null).map((_, index) => ({
    id: index,
    createdAt: new Date(index),
    title: `Post title ${index}`,
    body: `Post body ${index}`
  }));

  getPosts(): Observable<Post[]> {
    const postsSortedByCreationDateDesc = this.posts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    return of(postsSortedByCreationDateDesc);
  }

  createPost(dto: CreatePostDTO): Observable<Post> {
    const date = new Date();
    const post: Post = {
      id: date.valueOf(),
      createdAt: date,
      title: dto.title,
      body: dto.body
    };
    this.posts.push(post);
    return of(post);
  }
}
