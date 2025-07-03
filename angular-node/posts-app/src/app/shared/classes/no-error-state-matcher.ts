import type { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import type { ErrorStateMatcher } from '@angular/material/core';

export class NoErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return false;
  }
}
