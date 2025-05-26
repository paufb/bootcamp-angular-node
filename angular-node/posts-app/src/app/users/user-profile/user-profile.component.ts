import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
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
  private readonly username = this.activatedRoute.snapshot.params['username'];
  protected readonly isOwnProfile = computed(() => this.authService.username() === this.username);
  protected readonly user = signal<IUser | null>(null);
  protected readonly posts = signal<IPost[] | null>(null);

  ngOnInit(): void {
    this.userService.getUser(this.username)
      .subscribe({
        next: user => this.user.set(user),
        error: error => window.alert(`Could not fetch user: ${error.message}`)
      });
    this.postService.getPostsByUsername(this.username)
      .subscribe({
        next: posts => this.posts.set(posts),
        error: error => window.alert(`Could not fetch posts: ${error.message}`)
      });
  }
}
