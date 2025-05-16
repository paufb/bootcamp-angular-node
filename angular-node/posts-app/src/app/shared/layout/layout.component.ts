import { Component, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SidenavComponent } from '../sidenav/sidenav.component';

@Component({
  selector: 'app-layout',
  imports: [MatButtonModule, MatIconModule, MatSidenavModule, MatToolbarModule, RouterOutlet, SidenavComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  protected isSidenavCollapsed = signal(true);
  protected sidenavWidth = computed(() => this.isSidenavCollapsed() ? '3.5rem' : '15rem');
}
