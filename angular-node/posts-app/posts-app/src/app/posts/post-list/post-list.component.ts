import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs';
import { PostService } from '../shared/post.service';
import { Post } from '../shared/post.interface';

@Component({
  selector: 'app-post-list',
  imports: [MatButtonModule, MatCardModule, MatIconModule, RouterModule],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent implements OnInit, OnDestroy {
  protected posts = signal<Post[]>([]);
  private postsSubscription!: Subscription;
  private postService = inject(PostService);

  ngOnInit(): void {
    this.postsSubscription = this.postService.getPosts()
      .subscribe(posts => this.posts.set(posts));
  }

  ngOnDestroy(): void {
    this.postsSubscription.unsubscribe();
  }
}
