import { Injectable, signal } from '@angular/core';
import { Post } from './post.interface';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private readonly posts: Post[] = Array(5).fill(null).map((_, index) => ({
    id: index,
    title: `Post title ${index}`,
    body: `Post body ${index}`
  }));

  getPosts(): Observable<Post[]> {
    return of(this.posts);
  }

  createPost(post: Post): Observable<Post> {
    this.posts.push(post);
    return of(post);
  }
}
