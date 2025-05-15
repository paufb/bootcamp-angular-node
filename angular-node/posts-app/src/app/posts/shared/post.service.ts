import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreatePostDTO } from './create-post-dto.interface';
import { Post } from './post.interface';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private readonly url = 'http://localhost:3000/api/posts';
  private readonly httpClient = inject(HttpClient);

  getPosts(options?: { includeUser?: boolean; }): Observable<Post[]> {
    const { includeUser = false } = options ?? {};
    const url = new URL(this.url);
    if (includeUser) url.searchParams.append('user', 'true');
    return this.httpClient.get<Post[]>(url.toString());
  }

  createPost(dto: CreatePostDTO): Observable<Post> {
    return this.httpClient.post<Post>(this.url, dto);
  }
}
