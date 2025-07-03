import type { ISearchRouterOutletData } from '../../shared/interfaces/search-router-outlet-data.interface';
import { Component, inject, model, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatLabel, MatPrefix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatTabLink, MatTabNav } from '@angular/material/tabs';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NoErrorStateMatcher } from '../../shared/classes/no-error-state-matcher';

@Component({
  selector: 'app-search',
  imports: [MatFormField, MatIcon, MatInput, MatLabel, MatPrefix, MatTabLink, MatTabNav, ReactiveFormsModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  protected readonly query = model('');
  protected readonly routerOutletData = signal<ISearchRouterOutletData>({ query: '' });
  protected readonly noErrorStateMatcher = new NoErrorStateMatcher();
  protected readonly formGroup = new FormGroup({
    query: new FormControl('', { validators: [Validators.required], nonNullable: true })
  });
  protected readonly navLinks = [
    { href: ['posts'], name: 'Posts' },
    { href: ['users'], name: 'Users' }
  ];

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(queryParams => {
      const q = queryParams['q'];
      if (!q) return;
      this.query.set(q);
      this.routerOutletData.set({ query: q });
    });
  }

  protected onSubmit() {
    if (!this.formGroup.valid) return;
    const query = this.formGroup.controls.query.value;
    this.router.navigate([], { queryParams: { q: query } });
    this.routerOutletData.set({ query });
  }
}
