import { Component, computed, inject, signal } from '@angular/core';
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
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  protected username = this.authService.username;
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
}
