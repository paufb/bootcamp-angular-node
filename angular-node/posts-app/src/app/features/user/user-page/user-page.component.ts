import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { MatTab, type MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { fadeIn, fadeOut } from '../../../shared/animations';
import { UserPageHeaderComponent } from '../../../shared/components/user-page-header/user-page-header.component';
import { PostGridComponent } from '../../../shared/components/post-grid/post-grid.component';
import { IPost } from '../../../shared/interfaces/post.interface';
import { IUser } from '../../../shared/interfaces/user.interface';
import { PostService } from '../../../shared/services/post.service';
import { PostFeedService } from '../../../shared/services/post-feed.service';
import { UserService } from '../../../shared/services/user.service';

interface ITab { label: string; isSelected: boolean; fetchFn: () => void; };

@Component({
  selector: 'app-user-page',
  imports: [MatTab, MatTabGroup, UserPageHeaderComponent, PostGridComponent],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeOut]
})
export class UserPageComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly authService = inject(AuthService);
  private readonly userService = inject(UserService);
  private readonly postFeedService = inject(PostFeedService);
  private readonly postService = inject(PostService);
  private readonly username = signal<IUser['username']>('');
  protected readonly user = signal<IUser | null>(null);
  protected readonly posts = this.postFeedService.posts;
  protected readonly isOwnProfile = computed(() => this.username() === this.authService.authenticatedUser()?.username);
  protected readonly tabs = signal<ITab[]>([
    { label: 'Posts', isSelected: true, fetchFn: () => this.fetchMorePosts() },
    { label: 'Liked posts', isSelected: false, fetchFn: () => this.fetchMoreLikedPosts() }
  ]);
  private lastPostCreatedAt?: string;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const username = params['username'];
      this.username.set(username);
      this.resetAllUserState();
      this.fetchUser();
      this.fetchMorePosts();
    });
  }

  private resetAllUserState() {
    this.user.set(null);
    this.postFeedService.clearPosts();
    this.lastPostCreatedAt = undefined;
  }

  private fetchUser() {
    this.userService.getUserByUsername(this.username())
      .subscribe({
        next: user => this.user.set(user),
        error: error => window.alert(`Could not fetch user: ${error.message}`)
      });
  }

  private fetchMorePosts() {
    this.postService.getPostsByUsername(this.username(), { pageSize: 10, createdBefore: this.lastPostCreatedAt })
      .subscribe({
        next: posts => {
          this.postFeedService.appendPosts(posts);
          if (posts.length > 0)
            this.lastPostCreatedAt = posts[posts.length - 1].createdAt;
        },
        error: error => window.alert(`Could not fetch posts: ${error.message}`)
      });
  }

  private fetchMoreLikedPosts() {
    this.postService.getLikedPostsByUsername(this.username(), { pageSize: 10, createdBefore: this.lastPostCreatedAt })
      .subscribe({
        next: posts => {
          this.postFeedService.appendPosts(posts);
          if (posts.length > 0)
            this.lastPostCreatedAt = posts[posts.length - 1].createdAt;
        },
        error: error => window.alert(`Could not fetch liked posts: ${error.message}`)
      });
  }

  protected onTabChange(event: MatTabChangeEvent) {
    this.postFeedService.clearPosts();
    this.lastPostCreatedAt = undefined;
    this.tabs.update(prev => prev.map((tab, i) => ({ ...tab, isSelected: i === event.index })));
    this.tabs()[event.index].fetchFn();
  }

  protected deletePost(postId: IPost['_id']) {
    this.postFeedService.removePost(postId);
  }
}
