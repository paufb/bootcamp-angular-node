import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { heroes } from '../../constants/heroes';
import { Hero } from '../../models/hero.interface';

@Component({
  selector: 'app-heroes',
  imports: [FormsModule],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroesComponent {
  protected HEROES = heroes;
  protected readonly selectedHero = signal<Hero | null>(null);

  protected onSelectHero(hero: Hero) {
    this.selectedHero.set(hero);
  }
}
