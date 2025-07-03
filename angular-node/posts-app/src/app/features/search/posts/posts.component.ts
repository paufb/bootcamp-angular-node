import type { IPost } from '../../../shared/interfaces/post.interface';
import type { ISearchRouterOutletData } from '../../../shared/interfaces/search-router-outlet-data.interface';
import { Component, effect, inject, signal, Signal } from '@angular/core';
import { ROUTER_OUTLET_DATA } from '@angular/router';
import { PostGridComponent } from '../../../shared/components/post-grid/post-grid.component';
import { PostService } from '../../../shared/services/post.service';
import { PostFeedService } from '../../../shared/services/post-feed.service';

@Component({
  selector: 'app-posts',
  imports: [PostGridComponent],
  template: `
    @if (!query()) {
      <div>Use the search bar to search for posts...</div>
    } @else {
      <app-post-grid
        [posts]="posts()"
        (loadMorePosts)="fetchSearchedPosts()"
        (deletePost)="deletePost($event)"
      />
    }
  `,
  styles: `
    div {
      font-size: 1.25rem;
      color: var(--mat-sys-on-surface);
      text-align: center;
      margin-block: 1lh;
    }
  `
})
export class PostsComponent {
  private readonly data = inject(ROUTER_OUTLET_DATA) as Signal<ISearchRouterOutletData>;
  private readonly postFeedService = inject(PostFeedService);
  private readonly postService = inject(PostService);
  protected readonly posts = this.postFeedService.posts;
  protected query = signal<string | null>(null);
  private lastPostCreatedAt?: string;

  constructor() {
    effect(() => {
      this.query.set(this.data().query);
      this.lastPostCreatedAt = undefined;
      this.postFeedService.clearPosts();
      this.fetchSearchedPosts();
    });
  }

  protected fetchSearchedPosts() {
    this.postService.searchPosts(this.query()!, { pageSize: 10, createdBefore: this.lastPostCreatedAt })
      .subscribe({
        next: posts => {
          this.postFeedService.appendPosts(posts);
          if (posts.length > 0)
            this.lastPostCreatedAt = posts[posts.length - 1].createdAt;
        },
        error: error => window.alert(`Could not search posts: ${error.message}`)
      });
  }

  protected deletePost(postId: IPost['_id']) {
    this.postFeedService.removePost(postId);
  }
}
