import { ChangeDetectionStrategy, Component, inject, OnInit, signal, Signal } from '@angular/core';
import { ROUTER_OUTLET_DATA } from '@angular/router';
import { PostGridComponent } from '../shared/post-grid/post-grid.component';
import { IPost } from '../shared/post.interface';
import { PostService } from '../shared/post.service';
import { AuthService } from '../../auth/shared/auth.service';

@Component({
  selector: 'app-post-following',
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
export class PostFollowingComponent implements OnInit {
  protected readonly newlyCreatedPosts = inject<Signal<IPost[]>>(ROUTER_OUTLET_DATA);
  private readonly authService = inject(AuthService);
  private readonly postService = inject(PostService);
  protected readonly posts = signal<IPost[] | null>(null);
  private lastPostCreatedAt?: string;

  ngOnInit(): void {
    this.fetchMorePosts();
  }

  protected fetchMorePosts() {
    const { username } = this.authService.authenticatedUser()!;
    this.postService.getFollowingUsersPosts(username, { pageSize: 10, createdBefore: this.lastPostCreatedAt })
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
