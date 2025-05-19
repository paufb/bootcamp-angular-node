import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { Observable } from 'rxjs';
import { PostCardComponent } from '../shared/post-card/post-card.component';
import { PostService } from '../shared/post.service';
import { IPost } from '../shared/post.interface';

@Component({
  selector: 'app-post-list',
  imports: [AsyncPipe, MatButtonModule, MatIconModule, MatProgressSpinner, PostCardComponent, RouterModule],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent implements OnInit {
  private postService = inject(PostService);
  protected posts$!: Observable<IPost[]>;

  ngOnInit(): void {
    this.posts$ = this.postService.getPosts();
  }
}
