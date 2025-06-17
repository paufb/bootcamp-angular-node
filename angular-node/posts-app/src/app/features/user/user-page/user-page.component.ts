import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { MatTab, type MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { fadeOut } from '../../../shared/animations';
import { UserPageHeaderComponent } from '../../../shared/components/user-page-header/user-page-header.component';
import { PostGridComponent } from '../../../shared/components/post-grid/post-grid.component';
import { PostReplyGridComponent } from '../../../shared/components/post-reply-grid/post-reply-grid.component';
import { IPost } from '../../../shared/interfaces/post.interface';
import { IUser } from '../../../shared/interfaces/user.interface';
import { PostService } from '../../../shared/services/post.service';
import { PostFeedService } from '../../../shared/services/post-feed.service';
import { PostReplyService } from '../../../shared/services/post-reply.service';
import { UserService } from '../../../shared/services/user.service';
import { IPostReply } from '../../../shared/interfaces/post-reply.interface';

interface ITab { label: string; isSelected: boolean; fetchFn: () => void; };

@Component({
  selector: 'app-user-page',
  imports: [MatTab, MatTabGroup, PostGridComponent, PostReplyGridComponent, UserPageHeaderComponent],
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
  private readonly postReplyService = inject(PostReplyService);
  private readonly postService = inject(PostService);
  private readonly username = signal<IUser['username']>('');
  protected readonly user = signal<IUser | null>(null);
  protected readonly posts = this.postFeedService.posts;
  protected readonly postReplies = signal<IPostReply[] | null>(null);
  protected readonly isOwnProfile = computed(() => this.username() === this.authService.authenticatedUser()?.username);
  protected readonly tabs = signal<ITab[]>([
    { label: 'Posts', isSelected: true, fetchFn: () => this.fetchMorePosts() },
    { label: 'Post replies', isSelected: false, fetchFn: () => this.fetchMoreReplies() },
    { label: 'Liked posts', isSelected: false, fetchFn: () => this.fetchMoreLikedPosts() }
  ]);
  private lastPostCreatedAt?: string;
  private lastPostReplyCreatedAt?: string;

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

  protected fetchMorePosts() {
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

  protected fetchMoreReplies() {
    this.postReplyService.getUserPostReplies(this.user()!._id, { pageSize: 10, createdBefore: this.lastPostReplyCreatedAt })
      .subscribe({
        next: replies => {
          this.postReplies.update(prev => [...(prev ?? []), ...replies]);
          if (replies.length > 0)
            this.lastPostReplyCreatedAt = replies[replies.length - 1].createdAt;
        },
        error: error => window.alert(`Could not fetch post replies: ${error.message}`)
      });
  }

  protected fetchMoreLikedPosts() {
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
    this.postReplies.set(null);
    this.lastPostCreatedAt = undefined;
    this.lastPostReplyCreatedAt = undefined;
    this.tabs.update(prev => prev.map((tab, i) => ({ ...tab, isSelected: i === event.index })));
    this.tabs()[event.index].fetchFn();
  }

  protected deletePost(postId: IPost['_id']) {
    this.postFeedService.removePost(postId);
  }
}
