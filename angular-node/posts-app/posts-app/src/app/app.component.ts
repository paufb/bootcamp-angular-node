import { Component, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SidenavComponent } from './shared/sidenav/sidenav.component';

@Component({
  selector: 'app-root',
  imports: [MatButtonModule, MatIconModule, MatSidenavModule, MatToolbarModule, RouterOutlet, SidenavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  protected isSidenavCollapsed = signal(false);
  protected sidenavWidth = computed(() => this.isSidenavCollapsed() ? '4rem' : '15rem');
}
