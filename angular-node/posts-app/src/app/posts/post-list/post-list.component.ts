import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { Observable } from 'rxjs';
import { PostService } from '../shared/post.service';
import { Post } from '../shared/post.interface';

@Component({
  selector: 'app-post-list',
  imports: [AsyncPipe, DatePipe, MatButtonModule, MatCardModule, MatChipsModule, MatIconModule, MatProgressSpinner, RouterModule],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent implements OnInit {
  protected posts$!: Observable<Post[]>;
  private postService = inject(PostService);

  ngOnInit(): void {
    this.posts$ = this.postService.getPosts();
  }
}
