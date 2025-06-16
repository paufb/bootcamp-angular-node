import { transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { pushDownPageAnimationGroup, pushUpPageAnimationGroup } from './shared/animations';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    trigger('routeAnimations', [
      transition('LoginPage => SignupPage', pushDownPageAnimationGroup),
      transition('SignupPage => LoginPage', pushUpPageAnimationGroup)
    ])
  ]
})
export class AppComponent {
  protected getRouteAnimationState(outlet: RouterOutlet) {
    return outlet.activatedRouteData['animationState'];
  }
}
