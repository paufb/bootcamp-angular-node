import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreatePostDTO } from './create-post-dto.interface';
import { IPost } from './post.interface';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private readonly URL = '/api/posts';
  private readonly httpClient = inject(HttpClient);

  getPosts(): Observable<IPost[]> {
    return this.httpClient.get<IPost[]>(this.URL);
  }

  createPost(dto: CreatePostDTO): Observable<IPost> {
    return this.httpClient.post<IPost>(this.URL, dto);
  }
}
