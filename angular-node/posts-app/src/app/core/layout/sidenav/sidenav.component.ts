import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { ProfilePictureComponent } from '../../../shared/components/profile-picture/profile-picture.component';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-sidenav',
  imports: [MatIconModule, MatListModule, RouterModule, ProfilePictureComponent],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidenavComponent {
  private readonly authService = inject(AuthService);
  protected readonly authenticatedUser = this.authService.authenticatedUser;
  protected readonly navListItems = [
    { href: '/posts', title: 'Home', matIcon: 'home' },
    { href: '/settings', title: 'Settings', matIcon: 'settings' }
  ];
}
