import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { heroes } from '../constants/heroes';
import { Hero } from '../models/hero.interface';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  getHeroes(): Observable<Hero[]> {
    return of(heroes);
  }
}
