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
        data: { animationState: 'AnyPostsChildrenPage' },
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
        ]
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
        path: 'search',
        loadComponent: () => import('./features/search/search.component').then(m => m.SearchComponent),
        data: { animationState: 'SearchPage' },
        children: [
          { path: '', pathMatch: 'full', redirectTo: 'posts' },
          {
            path: 'posts',
            loadComponent: () => import('./features/search/posts/posts.component').then(m => m.PostsComponent)
          },
          {
            path: 'users',
            loadComponent: () => import('./features/search/users/users.component').then(m => m.UsersComponent)
          }
        ]
      },
      {
        path: 'settings',
        loadComponent: () => import('./features/settings/settings.component').then(m => m.SettingsComponent),
        data: { animationState: 'AnySettingsChildrenPage' },
        children: [
          { path: '', pathMatch: 'full', redirectTo: 'general' },
          {
            path: 'general',
            loadComponent: () => import('./features/settings/general-settings/general-settings.component').then(m => m.GeneralSettingsComponent)
          },
          {
            path: 'profile',
            loadComponent: () => import('./features/settings/profile-settings/profile-settings.component').then(m => m.ProfileSettingsComponent)
          }
        ]
      }
    ]
  },
  { path: '**', redirectTo: '' }  
];
