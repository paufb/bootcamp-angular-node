import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, model, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { Observable } from 'rxjs';
import { IUser } from '../user.interface';
import { UserService } from '../user.service';
import { fadeIn, fadeOut } from '../../../shared/animations';
import { ProfilePictureComponent } from '../../../shared/profile-picture/profile-picture.component';

interface DialogData {
  user: IUser;
  selectedTab: 'Following' | 'Followers';
}

@Component({
  selector: 'app-user-follow-list-dialog',
  imports: [AsyncPipe, MatButton, MatDialogModule, MatProgressSpinner, MatTabsModule, ProfilePictureComponent],
  templateUrl: './user-follow-list-dialog.component.html',
  styleUrl: './user-follow-list-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeIn, fadeOut]
})
export class UserFollowListDialogComponent implements OnInit {
  dialogRef = inject(MatDialogRef<UserFollowListDialogComponent>);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  protected readonly user = model(this.data.user);
  protected readonly selectedTab = model(this.data.selectedTab);
  private readonly userService = inject(UserService);
  protected readonly selectedTabIndex = computed(() => this.getSelectedTabIndex(this.selectedTab()));
  protected followingUsers$!: Observable<IUser[]>;

  ngOnInit(): void {
    this.followingUsers$ = this.userService.getFollowingUsers(this.user().username);
  }

  private getSelectedTabIndex(selectedTab: DialogData['selectedTab']) {
    const indexes: { [key in typeof selectedTab]: number } = {
      'Following': 0,
      'Followers': 1
    };
    return indexes[selectedTab];
  }
}
