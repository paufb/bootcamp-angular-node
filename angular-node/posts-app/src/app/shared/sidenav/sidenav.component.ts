import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { fadeIn, fadeOut } from '../animations';
import { ProfilePictureComponent } from '../profile-picture/profile-picture.component';
import { AuthService } from '../../auth/shared/auth.service';
import { UserService } from '../../users/shared/user.service';
import { IUser } from '../../users/shared/user.interface';

@Component({
  selector: 'app-sidenav',
  imports: [AsyncPipe, MatIconModule, MatListModule, RouterModule, ProfilePictureComponent],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeIn, fadeOut]
})
export class SidenavComponent {
  private readonly authService = inject(AuthService);
  private readonly userService = inject(UserService);
  protected readonly username = this.authService.username;
  protected navListItems = [{ href: '/posts', title: 'Home', matIcon: 'home' }];
  protected currentUser$!: Observable<IUser>;

  constructor() {
    effect(() => {
      const currentUserUsername = this.username();
      if (currentUserUsername)
        this.currentUser$ = this.userService.getUser(currentUserUsername);
    });
  }
}
