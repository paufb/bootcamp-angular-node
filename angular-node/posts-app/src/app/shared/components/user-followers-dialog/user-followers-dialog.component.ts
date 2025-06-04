import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, model, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { Observable } from 'rxjs';
import { fadeIn, fadeOut } from '../../../shared/animations';
import { IUser } from '../../interfaces/user.interface';
import { UserService } from '../../services/user.service';
import { ProfilePictureComponent } from '../profile-picture/profile-picture.component';

interface DialogData {
  user: IUser;
  selectedTab: 'Following' | 'Followers';
}

@Component({
  selector: 'app-user-followers-dialog',
  imports: [AsyncPipe, MatButton, MatDialogModule, MatProgressSpinner, MatTabsModule, ProfilePictureComponent],
  templateUrl: './user-followers-dialog.component.html',
  styleUrl: './user-followers-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeIn, fadeOut]
})
export class UserFollowersDialogComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<UserFollowersDialogComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  protected readonly user = model(this.data.user);
  protected readonly selectedTab = model(this.data.selectedTab);
  private readonly userService = inject(UserService);
  protected readonly selectedTabIndex = computed(() => this.getSelectedTabIndex(this.selectedTab()));
  protected followingUsers$!: Observable<IUser[]>;
  protected followersUsers$!: Observable<IUser[]>;

  ngOnInit(): void {
    this.followingUsers$ = this.userService.getFollowingUsers(this.user().username);
    this.followersUsers$ = this.userService.getFollowersUsers(this.user().username);
  }

  private getSelectedTabIndex(selectedTab: DialogData['selectedTab']) {
    const indexes: { [key in typeof selectedTab]: number } = {
      'Following': 0,
      'Followers': 1
    };
    return indexes[selectedTab];
  }
}
