import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreatePostDTO } from './create-post-dto.interface';
import { Post } from './post.interface';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private readonly url = '/api/posts';
  private readonly httpClient = inject(HttpClient);

  getPosts(options?: { includeUser?: boolean; }): Observable<Post[]> {
    const { includeUser = false } = options ?? {};
    let url = this.url;
    if (includeUser) url = `${url}?user=true`;
    return this.httpClient.get<Post[]>(url);
  }

  createPost(dto: CreatePostDTO): Observable<Post> {
    return this.httpClient.post<Post>(this.url, dto);
  }
}
