import { transition, trigger } from '@angular/animations';
import { Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { pageEnterSlideUpAnimationGroup, pageLeaveSlideDownAnimationGroup } from '../animations';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { AuthService } from '../../auth/shared/auth.service';

@Component({
  selector: 'app-layout',
  imports: [MatButtonModule, MatIconModule, MatSidenavModule, MatToolbarModule, RouterOutlet, SidenavComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  animations: [
    trigger('routeAnimations', [
      transition('AnyPostsChildrenPage => PostCreatePage', pageEnterSlideUpAnimationGroup),
      transition('PostCreatePage => AnyPostsChildrenPage', pageLeaveSlideDownAnimationGroup),
      transition('UserProfilePage => ProfileSettingsPage', pageEnterSlideUpAnimationGroup),
      transition('ProfileSettingsPage => UserProfilePage', pageLeaveSlideDownAnimationGroup)
    ]),
  ]
})
export class LayoutComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  protected readonly authenticatedUser = this.authService.authenticatedUser;
  protected readonly isSidenavCollapsed = signal(false);

  protected onToggleSidebar() {
    this.isSidenavCollapsed.update(value => !value);
  }

  protected onLogOut() {
    this.authService.logOut()
      .subscribe({
        error: err => window.alert(`Could not log out: ${err.message}`),
        complete: () => this.router.navigateByUrl('login')
      });
  }

  protected getRouteAnimationState(outlet: RouterOutlet) {
    return outlet.activatedRouteData['animationState'];
  }
}
