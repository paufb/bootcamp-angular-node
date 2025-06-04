import { transition, trigger } from '@angular/animations';
import { Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { pageEnterSlideUpAnimationGroup, pageLeaveSlideDownAnimationGroup } from '../../../shared/animations';
import { AuthService } from '../../auth/auth.service';
import { SidenavComponent } from '../sidenav/sidenav.component';

@Component({
  selector: 'app-page-layout',
  imports: [MatButtonModule, MatIconModule, MatSidenavModule, MatToolbarModule, RouterOutlet, SidenavComponent],
  templateUrl: './page-layout.component.html',
  styleUrl: './page-layout.component.scss',
  animations: [
    trigger('routeAnimations', [
      transition('AnyPostsChildrenPage => PostCreatePage', pageEnterSlideUpAnimationGroup),
      transition('PostCreatePage => AnyPostsChildrenPage', pageLeaveSlideDownAnimationGroup),
      transition('UserProfilePage => ProfileSettingsPage', pageEnterSlideUpAnimationGroup),
      transition('ProfileSettingsPage => UserProfilePage', pageLeaveSlideDownAnimationGroup)
    ]),
  ]
})
export class PageLayoutComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  protected readonly authenticatedUser = this.authService.authenticatedUser;
  protected readonly isSidenavCollapsed = signal(false);

  protected toggleSidebar() {
    this.isSidenavCollapsed.update(value => !value);
  }

  protected onLogOut() {
    this.authService.logOut()
      .subscribe({
        error: err => window.alert(`Could not log out: ${err.message}`),
        complete: () => this.router.navigate(['/login'])
      });
  }

  protected getRouteAnimationState(outlet: RouterOutlet) {
    return outlet.activatedRouteData['animationState'];
  }
}
