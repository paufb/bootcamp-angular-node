import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';
import { heroes } from '../../constants/heroes';
import { Hero } from '../../models/hero.interface';

@Component({
  selector: 'app-heroes',
  imports: [FormsModule, HeroDetailComponent],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.css',
})
export class HeroesComponent {
  protected HEROES = heroes;
  protected selectedHero!: Hero;

  protected onSelectHero(hero: Hero) {
    this.selectedHero = hero;
  }
}
