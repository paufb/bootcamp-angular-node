import { ChangeDetectionStrategy, Component, inject, OnInit, signal, Signal } from '@angular/core';
import { ROUTER_OUTLET_DATA } from '@angular/router';
import { PostGridComponent } from '../../../shared/components/post-grid/post-grid.component';
import { IPost } from '../../../shared/interfaces/post.interface';
import { PostService } from '../../../shared/services/post.service';

@Component({
  selector: 'app-posts-all',
  imports: [PostGridComponent],
  template: `
    <app-post-grid
      [posts]="posts()"
      [newlyCreatedPosts]="newlyCreatedPosts()"
      (loadMorePosts)="fetchMorePosts()"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostsAllComponent implements OnInit {
  protected newlyCreatedPosts = inject<Signal<IPost[]>>(ROUTER_OUTLET_DATA);
  private postService = inject(PostService);
  protected posts = signal<IPost[] | null>(null);
  private lastPostCreatedAt?: string;

  ngOnInit(): void {
    this.fetchMorePosts();
  }

  protected fetchMorePosts() {
    this.postService.getPosts({ pageSize: 10, createdBefore: this.lastPostCreatedAt })
      .subscribe({
        next: posts => {
          this.posts.update(previousPosts => [...(previousPosts ?? []), ...posts]);
          if (posts.length > 0)
            this.lastPostCreatedAt = posts[posts.length - 1].createdAt;
        },
        error: error => window.alert(`Could not fetch posts: ${error.message}`)
      });
  }
}
