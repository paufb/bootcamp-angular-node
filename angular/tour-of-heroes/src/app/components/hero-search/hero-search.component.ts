import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { debounceTime, distinctUntilChanged, Observable, Subject, switchMap } from 'rxjs';
import { Hero } from '../../models/hero.interface';
import { HeroService } from '../../services/hero.service';

@Component({
  selector: 'app-hero-search',
  imports: [AsyncPipe, RouterModule],
  templateUrl: './hero-search.component.html',
  styleUrl: './hero-search.component.css'
})
export class HeroSearchComponent implements OnInit {
  protected heroes$!: Observable<Hero[]>;
  private searchTerms = new Subject<string>();
  private readonly heroService = inject(HeroService);

  protected search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit() {
    this.heroes$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.heroService.searchHeroes(term)),
    );
  }
}
