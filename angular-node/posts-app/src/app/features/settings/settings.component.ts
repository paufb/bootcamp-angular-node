import { Component } from '@angular/core';
import { MatTabLink, MatTabNav } from '@angular/material/tabs';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-settings',
  imports: [MatTabNav, MatTabLink, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  protected readonly navLinks = [
    { href: 'general', name: 'General' },
    { href: 'profile', name: 'Profile' }
  ];
}
