import { Routes } from '@angular/router';
import { HeroesComponent } from './components/heroes/heroes.component';

export const routes: Routes = [
  { path: '', component: HeroesComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
