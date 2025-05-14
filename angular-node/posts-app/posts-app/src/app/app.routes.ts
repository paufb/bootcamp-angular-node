import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./posts/post-list/post-list.component').then(m => m.PostListComponent) },
  { path: 'user/:userName', loadComponent: () => import('./users/user-profile/user-profile.component').then(m => m.UserProfileComponent) },
  { path: 'posts/new', loadComponent: () => import('./posts/post-create/post-create.component').then(m => m.PostCreateComponent) }
];
