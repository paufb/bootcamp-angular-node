import { animate, group, query, style, transition, trigger } from '@angular/animations';
import { Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { AuthService } from '../../auth/shared/auth.service';

@Component({
  selector: 'app-layout',
  imports: [MatButtonModule, MatIconModule, MatSidenavModule, MatToolbarModule, RouterOutlet, SidenavComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  animations: [
    trigger('routeAnimations', [
      transition('AnyPostsChildrenPage => PostCreatePage', [
        group([
          query(':leave', style({ 'z-index': 0 })),
          query(':enter', [
            style({ transform: 'translateY(100dvh)', 'z-index': 1, 'background-color': 'var(--app-background-color)' }),
            animate('.3s ease-out', style({ transform: 'translateY(0)' }))
          ])
        ])
      ]),
      transition('PostCreatePage => AnyPostsChildrenPage', [
        group([
          query(':leave', [
            style({ 'z-index': 1, 'background-color': 'var(--app-background-color)' }),
            animate('.3s ease-in', style({ transform: 'translateY(100dvh)' }))
          ]),
          query(':enter', style({ 'z-index': 0 }))
        ])
      ])
    ]),
  ]
})
export class LayoutComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  protected loggedInUser = this.authService.loggedInUser;
  protected isSidenavCollapsed = signal(false);

  protected onToggleSidebar() {
    this.isSidenavCollapsed.update(value => !value);
  }

  protected onLogOut() {
    this.authService.logOut()
      .subscribe({
        error: err => window.alert(`Could not log out: ${err.message}`),
        complete: () => this.router.navigate(['login'])
      });
  }

  protected getRouteAnimationState(outlet: RouterOutlet) {
    return outlet.activatedRouteData['animationState'];
  }
}
