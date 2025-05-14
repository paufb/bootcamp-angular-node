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

  getPosts(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(this.url);
  }

  createPost(dto: CreatePostDTO): Observable<Post> {
    return this.httpClient.post<Post>(this.url, dto);
  }
}
