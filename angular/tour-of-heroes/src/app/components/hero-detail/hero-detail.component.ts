import { Component, inject, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Hero } from '../../models/hero.interface';
import { HeroService } from '../../services/hero.service';

@Component({
  selector: 'app-hero-detail',
  imports: [FormsModule],
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.css'
})
export class HeroDetailComponent implements OnInit {
  protected hero!: Hero;
  private readonly heroService = inject(HeroService);
  private readonly route = inject(ActivatedRoute);
  private readonly location = inject(Location);

  ngOnInit() {
    const heroId = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(heroId).subscribe((hero) => this.hero = hero);
  }

  protected goBack() {
    this.location.back();
  }

  protected save() {
    if (!this.hero) return;
    this.heroService.updateHero(this.hero).subscribe(() => this.goBack());
  }
}
