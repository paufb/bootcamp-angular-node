import type { IPost } from '../interfaces/post.interface';
import type { IPostReply } from '../interfaces/post-reply.interface';
import type { IUser } from '../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface PostReplyRequestQueryParams {
  pageSize: number;
  page?: number;
  createdBefore?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PostReplyService {
  private readonly POSTS_URL = '/api/posts';
  private readonly USERS_URL = '/api/users';
  private readonly httpClient = inject(HttpClient);

  private constructQueryParams(params: PostReplyRequestQueryParams): Record<string, string | number | boolean> {
    const queryParams: Record<string, string | number | boolean> = {};
    if (params.pageSize) queryParams['page_size'] = params.pageSize;
    if (params.page) queryParams['page'] = params.page;
    if (params.createdBefore) queryParams['created_before'] = params.createdBefore;
    return queryParams;
  }

  getPostReplies(postId: IPost['_id'], params: PostReplyRequestQueryParams): Observable<IPostReply[]> {
    const queryParams = this.constructQueryParams(params);
    return this.httpClient.get<IPostReply[]>(`${this.POSTS_URL}/${postId}/replies`, { params: queryParams });
  }

  getUserPostReplies(userId: IUser['_id'], params: PostReplyRequestQueryParams): Observable<IPostReply[]> {
    const queryParams = this.constructQueryParams(params);
    return this.httpClient.get<IPostReply[]>(`${this.USERS_URL}/${userId}/replies`, { params: queryParams });
  }

  createPostReply(postId: IPost['_id'], dto: Pick<IPostReply, 'body'>): Observable<IPostReply> {
    return this.httpClient.post<IPostReply>(`${this.POSTS_URL}/${postId}/replies`, dto);
  }

  deletePostReply(postReplyId: IPostReply['_id']): Observable<null> {
    return this.httpClient.delete<null>(`${this.POSTS_URL}/replies/${postReplyId}`);
  }
}
