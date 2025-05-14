import { Component, inject, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Router, RouterModule } from '@angular/router';
import { ProfilePictureComponent } from '../profile-picture/profile-picture.component';
import { UserService } from '../../users/shared/user.service';

@Component({
  selector: 'app-sidenav',
  imports: [MatIconModule, MatListModule, RouterModule, ProfilePictureComponent],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css',
  host: {
    '[class.collapsed]': 'isCollapsed()'
  }
})
export class SidenavComponent {
  isCollapsed = input.required<boolean>();
  private readonly userService = inject(UserService);
  protected readonly router = inject(Router);
  protected readonly currentUser = this.userService.getCurrentUser();
  protected navListItems = [
    { href: '/', title: 'Home', matIcon: 'home' }
  ];
}
