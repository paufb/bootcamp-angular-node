import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { PostCardSkeletonComponent } from '../shared/post-card-skeleton/post-card-skeleton.component';
import { PostCardComponent } from '../shared/post-card/post-card.component';
import { PostPromptComponent } from '../shared/post-prompt/post-prompt.component';
import { PostService } from '../shared/post.service';
import { IPost } from '../shared/post.interface';
import { fadeIn, fadeOut, scaleFadeInFromTop } from '../../shared/animations';

@Component({
  selector: 'app-post-list',
  imports: [AsyncPipe, MatButtonModule, MatIconModule, PostCardComponent, PostCardSkeletonComponent, PostPromptComponent, RouterModule],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss',
  animations: [fadeIn, fadeOut, scaleFadeInFromTop]
})
export class PostListComponent implements OnInit {
  private postService = inject(PostService);
  protected posts$!: Observable<IPost[]>;
  protected newlyCreatedPosts = signal<IPost[]>([]);

  ngOnInit(): void {
    this.posts$ = this.postService.getPosts();
  }

  onCreatePost(newlyCreatedPost: IPost) {
    this.newlyCreatedPosts.update(posts => [newlyCreatedPost, ...posts]);
  }
}
