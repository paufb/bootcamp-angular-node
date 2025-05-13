import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Hero } from '../../models/hero.interface';
import { HeroService } from '../../services/hero.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-heroes',
  imports: [FormsModule, RouterModule],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.css',
})
export class HeroesComponent implements OnInit {
  protected heroes: Hero[] = [];
  private heroService = inject(HeroService);

  ngOnInit() {
    this.getHeroes();
  }

  protected addHero(name: string) {
    name = name.trim();
    if (!name) return;
    this.heroService.addHero({ name } as Hero).subscribe((hero) => this.heroes.push(hero));
  }

  protected delete(hero: Hero) {
    this.heroes = this.heroes.filter((h) => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }

  private getHeroes() {
    this.heroService.getHeroes().subscribe((heroes) => this.heroes = heroes);
  }
}
