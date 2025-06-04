import { ChangeDetectionStrategy, Component, computed, effect, inject, input, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { RouterLink } from '@angular/router';
import { fadeIn, fadeOut } from '../../../shared/animations';
import { IUser } from '../../interfaces/user.interface';
import { UserService } from '../../services/user.service';
import { ProfilePictureComponent } from '../profile-picture/profile-picture.component';
import { UserFollowersDialogComponent } from '../user-followers-dialog/user-followers-dialog.component';

@Component({
  selector: 'app-user-page-header',
  imports: [MatButtonModule, ProfilePictureComponent, RouterLink],
  templateUrl: './user-page-header.component.html',
  styleUrl: './user-page-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeIn, fadeOut]
})
export class UserPageHeaderComponent {
  readonly user = input.required<IUser | null>();
  readonly isOwn = input<boolean>(false);
  private readonly userService = inject(UserService);
  private readonly matDialog = inject(MatDialog);
  protected readonly hasBeenFollowed = signal<boolean>(false);
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
    this.matDialog.open(UserFollowersDialogComponent, {
      data: { user: this.user(), selectedTab }
    });
  }
}
