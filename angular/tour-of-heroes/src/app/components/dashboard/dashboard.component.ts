import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeroSearchComponent } from '../hero-search/hero-search.component';
import { Hero } from '../../models/hero.interface';
import { HeroService } from '../../services/hero.service';

@Component({
  selector: 'app-dashboard',
  imports: [HeroSearchComponent, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  protected heroes: Hero[] = [];
  private heroService = inject(HeroService);

  ngOnInit() {
    this.getHeroes();
  }

  private getHeroes() {
    this.heroService.getHeroes().subscribe((heroes) => this.heroes = heroes.slice(1, 5));
  }
}
