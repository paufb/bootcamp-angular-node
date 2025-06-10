import { Injectable, signal } from '@angular/core';
import { IPost } from '../interfaces/post.interface';

@Injectable({
  providedIn: 'root'
})
export class PostFeedService {
  private readonly _posts = signal<IPost[] | null>(null);
  readonly posts = this._posts.asReadonly();

  prependPost(post: IPost) {
    this._posts.update(value => [post, ...(value ?? [])]);
  }

  appendPosts(posts: IPost[]) {
    this._posts.update(value => [...(value ?? []), ...posts]);
  }

  removePost(postId: IPost['_id']) {
    this._posts.update(value => (value ?? []).filter(p => p._id !== postId));
  }

  clearPosts() {
    this._posts.set(null);
  }
}
