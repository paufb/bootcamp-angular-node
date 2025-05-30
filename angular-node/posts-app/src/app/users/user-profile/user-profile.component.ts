import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserProfileHeaderComponent } from '../shared/user-profile-header/user-profile-header.component';
import { IUser } from '../shared/user.interface';
import { UserService } from '../shared/user.service';
import { AuthService } from '../../auth/shared/auth.service';
import { PostGridComponent } from '../../posts/shared/post-grid/post-grid.component';
import { IPost } from '../../posts/shared/post.interface';
import { PostService } from '../../posts/shared/post.service';
import { fadeIn, fadeOut } from '../../shared/animations';

@Component({
  selector: 'app-user-profile',
  imports: [UserProfileHeaderComponent, PostGridComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeIn, fadeOut]
})
export class UserProfileComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly authService = inject(AuthService);
  private readonly userService = inject(UserService);
  private readonly postService = inject(PostService);
  protected readonly isOwnProfile = signal<boolean>(false);
  protected readonly user = signal<IUser | null>(null);
  protected readonly posts = signal<IPost[] | null>(null);
  private username!: IUser['username'];
  private page = 0;

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
    this.userService.getUser(this.username)
      .subscribe({
        next: user => this.user.set(user),
        error: error => window.alert(`Could not fetch user: ${error.message}`)
      });
  }

  protected fetchMorePosts() {
    this.postService.getPostsByUsername(this.username, { pagesize: 10, page: this.page })
      .subscribe({
        next: posts => {
          this.posts.update(previousPosts => [...(previousPosts ?? []), ...posts]);
          this.page++;
        },
        error: error => window.alert(`Could not fetch posts: ${error.message}`)
      });
  }
}
