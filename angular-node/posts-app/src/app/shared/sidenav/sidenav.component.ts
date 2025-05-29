import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { ProfilePictureComponent } from '../profile-picture/profile-picture.component';
import { AuthService } from '../../auth/shared/auth.service';

@Component({
  selector: 'app-sidenav',
  imports: [MatIconModule, MatListModule, RouterModule, ProfilePictureComponent],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidenavComponent {
  private readonly authService = inject(AuthService);
  protected readonly loggedInUser = this.authService.loggedInUser;
  protected readonly profilePictureSrc = computed(() => this.loggedInUser() ? null : undefined);
  protected readonly navListItems = [{ href: '/posts', title: 'Home', matIcon: 'home' }];
}
