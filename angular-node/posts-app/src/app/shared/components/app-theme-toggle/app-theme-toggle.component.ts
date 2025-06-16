import { Component, inject } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { AppThemeService } from '../../services/app-theme.service';

@Component({
  selector: 'app-app-theme-toggle',
  imports: [MatIcon, MatIconButton],
  templateUrl: './app-theme-toggle.component.html'
})
export class AppThemeToggleComponent {
  private readonly appThemeService = inject(AppThemeService);
  protected readonly currentTheme = this.appThemeService.currentTheme;

  protected toggleTheme() {
    this.appThemeService.setTheme(this.currentTheme() === 'light' ? 'dark' : 'light');
  }
}
