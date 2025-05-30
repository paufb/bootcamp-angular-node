import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreatePostDTO } from './create-post-dto.interface';
import { IPost } from './post.interface';
import { IUser } from '../../users/shared/user.interface';

interface PostRequestOptions {
  pagesize: number;
  page: number;
}

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private readonly POSTS_URL = '/api/posts';
  private readonly USERS_URL = '/api/users';
  private readonly httpClient = inject(HttpClient);

  getPosts(options: PostRequestOptions): Observable<IPost[]> {
    return this.httpClient.get<IPost[]>(`${this.POSTS_URL}`, {
      params: { pagesize: options.pagesize, page: options.page }
    });
  }

  getPostsByUsername(username: IUser['username'], options: PostRequestOptions): Observable<IPost[]> {
    return this.httpClient.get<IPost[]>(`${this.USERS_URL}/${username}/posts`, {
      params: { pagesize: options.pagesize, page: options.page }
    });
  }

  getFollowingUsersPosts(username: IUser['username'], options: PostRequestOptions): Observable<IPost[]> {
    return this.httpClient.get<IPost[]>(`${this.USERS_URL}/${username}/following/posts`, {
      params: { pagesize: options.pagesize, page: options.page }
    });
  }

  createPost(dto: CreatePostDTO): Observable<IPost> {
    return this.httpClient.post<IPost>(this.POSTS_URL, dto);
  }

  likePost(like: boolean, postId: IPost['_id']): Observable<null> {
    const requestBody = { like };
    return this.httpClient.put<null>(`${this.POSTS_URL}/${postId}/like`, requestBody);
  }
}
