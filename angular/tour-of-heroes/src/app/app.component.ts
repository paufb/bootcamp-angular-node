import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MessagesComponent } from "./components/messages/messages.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { routeAnimations } from './route-animations';

@Component({
  selector: 'app-root',
  imports: [MessagesComponent, NavbarComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [routeAnimations]
})
export class AppComponent {
  protected title = 'Tour of Heroes';

  protected getRouteAnimation(outlet: RouterOutlet) {
    return outlet.activatedRouteData['animation'];
  }
}
