import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeroesComponent } from './components/heroes/heroes.component';
import { HeroDetailComponent } from './components/hero-detail/hero-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, data: { animation: 'fromLeft' } },
  { path: 'heroes', component: HeroesComponent, data: { animation: 'fromRight' } },
  { path: 'heroes/:id', component: HeroDetailComponent },
  { path: '**', redirectTo: '/dashboard', pathMatch: 'full' }
];
