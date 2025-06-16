import { animate, group, keyframes, query, style, transition, trigger } from '@angular/animations';

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

export const pageEnterSlideUpAnimationGroup = group([
  query(':leave', style({ 'z-index': 0 })),
  query('router-outlet ~ *', animate('.2s', style({})), { optional: true }),
  query(':enter', [
    style({ transform: 'translateY(100dvh)', 'z-index': 1, 'background-color': 'var(--app-background-color)' }),
    animate('.3s ease-out', style({ transform: 'translateY(0)' }))
  ])
]);

export const pageLeaveSlideDownAnimationGroup = group([
  query(':leave', [
    style({ 'z-index': 1, 'background-color': 'var(--app-background-color)' }),
    animate('.3s ease-in', style({ transform: 'translateY(100dvh)' }))
  ]),
  query(':enter', style({ 'z-index': 0 }))
]);

export const pushDownPageAnimationGroup = group([
  query(':leave', animate('.3s ease-in', style({ transform: 'translateY(100dvh)' }))),
  query(':enter', [
    style({ transform: 'translateY(-100dvh)' }),
    animate('.3s ease-out', style({ transform: 'translateY(0)' }))
  ])
]);

export const pushUpPageAnimationGroup = group([
  query(':leave', animate('.3s ease-in', style({ transform: 'translateY(-100dvh)' }))),
  query(':enter', [
    style({ transform: 'translateY(100dvh)' }),
    animate('.3s ease-out', style({ transform: 'translateY(0)' }))
  ])
]);

export const toPostPageAnimationGroup = group([
  query(':leave', animate('.2s ease-in', style({ opacity: 0, scale: .975 })), { optional: true }),
  query('router-outlet ~ *', animate('.2s', style({})), { optional: true }),
  query(':enter', [
    style({ opacity: 0, transform: 'translateX(12.5rem)' }),
    animate('.2s ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
  ], { optional: true })
]);

export const backFromPostPageAnimationGroup = group([
  query(':leave', animate('.2s ease-in', style({ opacity: 0, transform: 'translateX(12.5rem)' }))),
  query(':enter', [
    style({ opacity: 0 }),
    animate('.2s ease-out', style({ opacity: 1 }))
  ])
]);
