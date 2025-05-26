import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreatePostDTO } from './create-post-dto.interface';
import { IPost } from './post.interface';
import { IUser } from '../../users/shared/user.interface';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private readonly POSTS_URL = '/api/posts';
  private readonly USERS_URL = '/api/users';
  private readonly httpClient = inject(HttpClient);

  getPosts(): Observable<IPost[]> {
    return this.httpClient.get<IPost[]>(this.POSTS_URL);
  }

  getPostsByUsername(username: IUser['username']): Observable<IPost[]> {
    return this.httpClient.get<IPost[]>(`${this.USERS_URL}/${username}/posts`);
  }

  createPost(dto: CreatePostDTO): Observable<IPost> {
    return this.httpClient.post<IPost>(this.POSTS_URL, dto);
  }

  likePost(like: boolean, postId: IPost['_id']): Observable<null> {
    const requestBody = { like };
    return this.httpClient.put<null>(`${this.POSTS_URL}/${postId}/like`, requestBody);
  }
}
