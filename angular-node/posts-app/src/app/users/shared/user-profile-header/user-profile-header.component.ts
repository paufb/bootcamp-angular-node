import { ChangeDetectionStrategy, Component, computed, effect, inject, input, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { UserFollowListDialogComponent } from '../user-follow-list-dialog/user-follow-list-dialog.component';
import { IUser } from '../user.interface';
import { UserService } from '../user.service';
import { fadeIn, fadeOut } from '../../../shared/animations';
import { ProfilePictureComponent } from '../../../shared/profile-picture/profile-picture.component';

@Component({
  selector: 'app-user-profile-header',
  imports: [MatButtonModule, ProfilePictureComponent],
  templateUrl: './user-profile-header.component.html',
  styleUrl: './user-profile-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeIn, fadeOut]
})
export class UserProfileHeaderComponent {
  user = input.required<IUser | null>();
  isOwn = input<boolean>(false);
  private readonly userService = inject(UserService);
  private readonly matDialog = inject(MatDialog);
  protected readonly hasBeenFollowed = signal<boolean>(false);
  protected readonly profilePictureSrc = computed(() => this.user() ? null : undefined);
  protected readonly followersCount = computed<number>(() => {
    const user = this.user();
    const hasBeenFollowed = this.hasBeenFollowed();
    const count = user?.followers.count ?? 0;
    return hasBeenFollowed
      ? user?.isFollowedByUser ? count : count + 1
      : user?.isFollowedByUser ? count - 1 : count
  });

  constructor() {
    effect(() => {
      const user = this.user();
      if (user)
        this.hasBeenFollowed.set(!!user.isFollowedByUser);
    });
  }

  protected onFollow() {
    this.userService.followUser(!this.hasBeenFollowed(), this.user()!._id)
      .subscribe({
        error: error => window.alert(`Could not follow user: ${error.message}`),
        complete: () => this.hasBeenFollowed.update(value => !value)
      });
  }

  protected openUserFollowListDialog(selectedTab: 'Following' | 'Followers') {
    this.matDialog.open(UserFollowListDialogComponent, {
      data: { user: this.user(), selectedTab }
    });
  }
}
