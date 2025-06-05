import { Routes } from '@angular/router';
import { canActivateUserGuard } from './core/auth/can-activate-user.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'posts' },
  {
    path: 'login',
    loadComponent: () => import('./features/login/login.component').then(m => m.LoginComponent),
    data: { animationState: 'LoginPage' }
  },
  {
    path: 'signup',
    loadComponent: () => import('./features/signup/signup.component').then(m => m.SignupComponent),
    data: { animationState: 'SignupPage' }
  },
  {
    path: '',
    loadComponent: () => import('./core/layout/page-layout/page-layout.component').then(m => m.PageLayoutComponent),
    canActivateChild: [canActivateUserGuard],
    children: [
      {
        path: 'posts',
        loadComponent: () => import('./features/posts/posts-page.component').then(m => m.PostsPageComponent),
        children: [
          { path: '', pathMatch: 'full', redirectTo: 'all' },
          {
            path: 'all',
            loadComponent: () => import('./features/posts/all/posts-all.component').then(m => m.PostsAllComponent)
          },
          {
            path: 'following',
            loadComponent: () => import('./features/posts/following/posts-following.component').then(m => m.PostsFollowingComponent)
          }
        ],
        data: { animationState: 'AnyPostsChildrenPage' }
      },
      {
        path: 'posts/new',
        loadComponent: () => import('./features/posts/new/posts-new.component').then(m => m.PostsNewComponent),
        data: { animationState: 'PostCreatePage' }
      },
      {
        path: 'posts/:id',
        loadComponent: () => import('./features/posts/post-page/post-page.component').then(m => m.PostPageComponent),
        data: { animationState: 'PostPage' }
      },
      {
        path: 'user/:username',
        loadComponent: () => import('./features/user/user-page/user-page.component').then(m => m.UserPageComponent),
        data: { animationState: 'UserPage' }
      },
      {
        path: 'settings/profile',
        loadComponent: () => import('./features/settings/profile-settings/profile-settings.component').then(m => m.ProfileSettingsComponent),
        data: { animationState: 'ProfileSettingsPage' }
      }
    ]
  },
  { path: '**', redirectTo: '' }  
];
