import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICreatePostDTO } from '../interfaces/create-post-dto.interface';
import { IPost } from '../interfaces/post.interface';
import { IUser } from '../interfaces/user.interface';

interface PostRequestQueryParams {
  pageSize: number;
  page?: number;
  createdBefore?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private readonly POSTS_URL = '/api/posts';
  private readonly USERS_URL = '/api/users';
  private readonly httpClient = inject(HttpClient);

  private constructPaginationQueryParams(params: PostRequestQueryParams): Record<string, string | number | boolean> {
    const queryParams: Record<string, string | number | boolean> = {};
    if (params.pageSize) queryParams['page_size'] = params.pageSize;
    if (params.page) queryParams['page'] = params.page;
    if (params.createdBefore) queryParams['created_before'] = params.createdBefore;
    return queryParams;
  }

  getPost(postId: IPost['_id']): Observable<IPost> {
    return this.httpClient.get<IPost>(`${this.POSTS_URL}/${postId}`);
  }

  getPosts(params: PostRequestQueryParams): Observable<IPost[]> {
    const queryParams = this.constructPaginationQueryParams(params);
    return this.httpClient.get<IPost[]>(`${this.POSTS_URL}`, { params: queryParams });
  }

  getPostsByUsername(username: IUser['username'], params: PostRequestQueryParams): Observable<IPost[]> {
    const queryParams = this.constructPaginationQueryParams(params);
    return this.httpClient.get<IPost[]>(`${this.USERS_URL}/${username}/posts`, { params: queryParams });
  }

  getLikedPostsByUsername(username: IUser['username'], params: PostRequestQueryParams): Observable<IPost[]> {
    const queryParams = this.constructPaginationQueryParams(params);
    return this.httpClient.get<IPost[]>(`${this.USERS_URL}/${username}/liked-posts`, { params: queryParams });
  }

  getFollowingUsersPosts(username: IUser['username'], params: PostRequestQueryParams): Observable<IPost[]> {
    const queryParams = this.constructPaginationQueryParams(params);
    return this.httpClient.get<IPost[]>(`${this.USERS_URL}/${username}/following/posts`, { params: queryParams });
  }

  createPost(dto: ICreatePostDTO): Observable<IPost> {
    return this.httpClient.post<IPost>(this.POSTS_URL, dto);
  }

  deletePost(postId: IPost['_id']): Observable<null> {
    return this.httpClient.delete<null>(`${this.POSTS_URL}/${postId}`);
  }

  likePost(like: boolean, postId: IPost['_id']): Observable<null> {
    const requestBody = { like };
    return this.httpClient.put<null>(`${this.POSTS_URL}/${postId}/like`, requestBody);
  }

  searchPosts(query: string, params: PostRequestQueryParams): Observable<IPost[]> {
    const queryParams = {
      ...this.constructPaginationQueryParams(params),
      q: query
    };
    return this.httpClient.get<IPost[]>(`${this.POSTS_URL}/search`, { params: queryParams });
  }
}
