import { animate, group, query, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    trigger('routeAnimations', [
      transition('LoginPage => SignupPage', [
        group([
          query(':leave', animate('.3s ease-in', style({ transform: 'translate(0, 100dvh)' }))),
          query(':enter', [
            style({ transform: 'translate(0, -100dvh)' }),
            animate('.3s ease-out', style({ transform: 'translate(0, 0)' }))
          ])
        ])
      ]),
      transition('SignupPage => LoginPage', [
        group([
          query(':leave', animate('.3s ease-in', style({ transform: 'translate(0, -100dvh)' }))),
          query(':enter', [
            style({ transform: 'translate(0, 100dvh)' }),
            animate('.3s ease-out', style({ transform: 'translate(0, 0)' }))
          ])
        ])
      ])
    ])
  ]
})
export class AppComponent {
  protected getRouteAnimationState(outlet: RouterOutlet) {
    return outlet.activatedRouteData['animationState'];
  }
}
