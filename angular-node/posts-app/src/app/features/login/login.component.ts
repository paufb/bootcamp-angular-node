import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatIcon, MatInput, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  protected readonly isPasswordHidden = signal(true);
  protected readonly message = signal<string | null>(null);
  protected readonly formGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  protected onSubmit() {
    if (!this.formGroup.valid) return;
    const username = this.formGroup.get('username')!.value!;
    const password = this.formGroup.get('password')!.value!;
    this.authService.logIn(username, password)
      .subscribe({
        error: _ => this.message.set('Invalid credentials'),
        complete: () => this.router.navigate(['/'])
      });
  }
}
