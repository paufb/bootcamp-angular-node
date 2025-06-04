import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { fadeIn, fadeOut } from '../../../shared/animations';
import { UserPageHeaderComponent } from '../../../shared/components/user-page-header/user-page-header.component';
import { PostGridComponent } from '../../../shared/components/post-grid/post-grid.component';
import { IPost } from '../../../shared/interfaces/post.interface';
import { IUser } from '../../../shared/interfaces/user.interface';
import { PostService } from '../../../shared/services/post.service';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-user-page',
  imports: [UserPageHeaderComponent, PostGridComponent],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeIn, fadeOut]
})
export class UserPageComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly authService = inject(AuthService);
  private readonly userService = inject(UserService);
  private readonly postService = inject(PostService);
  protected readonly isOwnProfile = signal<boolean>(false);
  protected readonly user = signal<IUser | null>(null);
  protected readonly posts = signal<IPost[] | null>(null);
  private username!: IUser['username'];
  private lastPostCreatedAt?: string;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const username = params['username'];
      this.username = username;
      this.isOwnProfile.set(username === this.authService.authenticatedUser()?.username);
      this.fetchUser();
      this.fetchMorePosts();
    });
  }

  private fetchUser() {
    this.userService.getUserByUsername(this.username)
      .subscribe({
        next: user => this.user.set(user),
        error: error => window.alert(`Could not fetch user: ${error.message}`)
      });
  }

  protected fetchMorePosts() {
    this.postService.getPostsByUsername(this.username, { pageSize: 10, createdBefore: this.lastPostCreatedAt })
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
