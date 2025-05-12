import { animate, group, query, style, transition, trigger } from '@angular/animations';

export const routeAnimations = trigger('routeAnimations', [
  transition('fromRight => fromLeft', [
    query(':enter', style({ opacity: 0, transform: 'translateX(-100%)' })),
    query(':leave', style({ opacity: 1 })),
    group([
      query(':enter', animate('.4s ease', style({ opacity: 1, transform: 'translateX(0)' }))),
      query(':leave', animate('.4s ease', style({ opacity: 0, transform: 'translateX(100%)' })), { optional: true })
    ])
  ]),
  transition('fromLeft => fromRight', [
    query(':enter', style({ opacity: 0, transform: 'translateX(100%)' })),
    query(':leave', style({ opacity: 1 })),
    group([
      query(':enter', animate('.4s ease', style({ opacity: 1, transform: 'translateX(0)' }))),
      query(':leave', animate('.4s ease', style({ opacity: 0, transform: 'translateX(-100%)' })), { optional: true })
    ])
  ])
]);
