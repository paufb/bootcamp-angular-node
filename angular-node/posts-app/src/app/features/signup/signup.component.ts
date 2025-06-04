import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { ISignupFormData } from '../../shared/interfaces/signup-form-data.interface';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-signup',
  imports: [FormsModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, ReactiveFormsModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupComponent {
  private readonly authService = inject(AuthService);
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);
  protected readonly isPasswordHidden = signal(true);
  protected readonly formGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  protected onSubmit() {
    if (!this.formGroup.valid) return;
    const formData = this.formGroup.value as ISignupFormData;
    const { username, password } = formData;
    this.userService.createUser(formData)
      .subscribe({
        error: error => window.alert(`Could not sign up: ${error.message}`),
        complete: () => {
          this.authService.logIn(username, password)
            .subscribe({
              error: _ => window.alert('Could not log in after sign up'),
              complete: () => this.router.navigate(['/'])
            });
        }
      });
  }
}
