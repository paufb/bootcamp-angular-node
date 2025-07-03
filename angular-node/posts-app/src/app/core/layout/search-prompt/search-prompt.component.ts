import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatLabel, MatPrefix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { Router } from '@angular/router';
import { NoErrorStateMatcher } from '../../../shared/classes/no-error-state-matcher';

@Component({
  selector: 'app-search-prompt',
  imports: [MatFormField, MatIcon, MatInput, MatLabel, MatPrefix, ReactiveFormsModule],
  templateUrl: './search-prompt.component.html',
  styleUrl: './search-prompt.component.scss'
})
export class SearchPromptComponent {
  private readonly router = inject(Router);
  protected readonly noErrorStateMatcher = new NoErrorStateMatcher();
  protected readonly formGroup = new FormGroup({
    query: new FormControl('', { validators: [Validators.required], nonNullable: true })
  });

  protected onSubmit() {
    if (!this.formGroup.valid) return;
    const query = this.formGroup.controls.query.value;
    this.router.navigate(['/search'], { queryParams: { q: query } });
    this.formGroup.reset();
  }
}
