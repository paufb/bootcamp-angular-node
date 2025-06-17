import { Component, inject } from '@angular/core';
import { MatRadioButton, type MatRadioChange, MatRadioGroup } from '@angular/material/radio';
import { AppThemeService } from '../../../shared/services/app-theme.service';

@Component({
  selector: 'app-general-settings',
  imports: [MatRadioButton, MatRadioGroup],
  templateUrl: './general-settings.component.html',
  styleUrl: './general-settings.component.scss'
})
export class GeneralSettingsComponent {
  private readonly appThemeService = inject(AppThemeService);
  protected currentTheme = this.appThemeService.currentTheme;

  protected selectAppTheme(event: MatRadioChange) {
    this.appThemeService.setTheme(event.value);
  }
}
