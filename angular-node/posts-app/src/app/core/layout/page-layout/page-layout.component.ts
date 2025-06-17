import { transition, trigger } from '@angular/animations';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { backFromPostPageAnimationGroup, pageEnterSlideUpAnimationGroup, pageLeaveSlideDownAnimationGroup, toPostPageAnimationGroup } from '../../../shared/animations';
import { AppThemeToggleComponent } from '../../../shared/components/app-theme-toggle/app-theme-toggle.component';
import { AuthService } from '../../auth/auth.service';
import { SidenavComponent } from '../sidenav/sidenav.component';

@Component({
  selector: 'app-page-layout',
  imports: [AppThemeToggleComponent, MatButtonModule, MatIconModule, MatSidenavModule, MatToolbarModule, RouterOutlet, SidenavComponent],
  templateUrl: './page-layout.component.html',
  styleUrl: './page-layout.component.scss',
  animations: [
    trigger('routeAnimations', [
      transition('AnyPostsChildrenPage => PostCreatePage', pageEnterSlideUpAnimationGroup),
      transition('PostCreatePage => AnyPostsChildrenPage', pageLeaveSlideDownAnimationGroup),
      transition('* => AnySettingsChildrenPage', pageEnterSlideUpAnimationGroup),
      transition('AnySettingsChildrenPage => *', pageLeaveSlideDownAnimationGroup),
      transition('* => PostPage', toPostPageAnimationGroup),
      transition('PostPage => *', backFromPostPageAnimationGroup),
    ]),
  ]
})
export class PageLayoutComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly breakpointObserver = inject(BreakpointObserver);
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);
  protected readonly authenticatedUser = this.authService.authenticatedUser;
  protected readonly isSidenavCollapsed = signal(false);

  ngOnInit(): void {
    this.breakpointObserver.observe('(width < 90rem)')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(state => this.isSidenavCollapsed.set(state.matches));
  }

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
