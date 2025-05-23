import { Routes } from '@angular/router';
import { canActivateUserGuard } from './auth/shared/can-activate-user.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'posts'
  },
  {
    path: 'login',
    loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent),
    data: { animationState: 'LoginPage' }
  },
  {
    path: 'signup',
    loadComponent: () => import('./auth/signup/signup.component').then(m => m.SignupComponent),
    data: { animationState: 'SignupPage' }
  },
  {
    path: '',
    loadComponent: () => import('./shared/layout/layout.component').then(m => m.LayoutComponent),
    canActivateChild: [canActivateUserGuard],
    children: [
      {
        path: 'posts',
        loadComponent: () => import('./posts/post-list/post-list.component').then(m => m.PostListComponent),
      },
      {
        path: 'user/:username',
        loadComponent: () => import('./users/user-profile/user-profile.component').then(m => m.UserProfileComponent),
      },
      {
        path: 'posts/new',
        loadComponent: () => import('./posts/post-create/post-create.component').then(m => m.PostCreateComponent),
      }
    ]
  }  
];
