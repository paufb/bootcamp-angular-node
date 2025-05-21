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
  private readonly URL = '/api/posts';
  private readonly httpClient = inject(HttpClient);

  getPosts(options?: { username: string; }): Observable<IPost[]> {
    const { username } = options ?? {};
    let url = this.URL;
    if (username) url = `${url}?username=${username}`
    return this.httpClient.get<IPost[]>(this.URL);
  }

  getPostsByUsername(username: IUser['username']): Observable<IPost[]> {
    return this.httpClient.get<IPost[]>(`${this.URL}?username=${username}`);
  }

  createPost(dto: CreatePostDTO): Observable<IPost> {
    return this.httpClient.post<IPost>(this.URL, dto);
  }

  likePost(like: boolean, postId: IPost['_id']): Observable<null> {
    const requestBody = { like };
    return this.httpClient.put<null>(`${this.URL}/${postId}/like`, requestBody);
  }
}
