import { animate, keyframes, style, transition, trigger } from '@angular/animations';

export const fadeIn = trigger('fadeIn', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('.4s ease-in', style({ opacity: 1 }))
  ])
]);

export const fadeOut = trigger('fadeOut', [
  transition(':leave', [
    animate('.4s ease-out', style({ opacity: 0 }))
  ])
]);

export const scaleFadeInFromTop = trigger('scaleFadeInFromTop', [
  transition(':enter', [
    animate('.3s', keyframes([
      style({ scale: .95, opacity: 0, transform: 'translateY(-5rem)', offset: 0 }),
      style({ scale: .95, opacity: 1, transform: 'translateY(0)', offset: .7 }),
      style({ scale: 1, opacity: 1, transform: 'translateY(0)', offset: 1 })
    ]))
  ])
]);
