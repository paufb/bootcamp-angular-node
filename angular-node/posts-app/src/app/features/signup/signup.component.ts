import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
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
    name: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    username: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    password: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    profilePicture: new FormControl<File | null>(null)
  });

  protected selectProfilePictureFile(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files![0];
    this.formGroup.patchValue({ profilePicture: file });
  }

  protected submitForm() {
    if (!this.formGroup.valid) return;
    const formData = this.formGroup.getRawValue();
    this.userService.createUser(formData)
      .subscribe({
        error: error => {
          if (error.status === 400)
            this.formGroup.get('username')?.setErrors({ usernameTaken: true });
        },
        complete: () => {
          this.authService.logIn(formData.username, formData.password)
            .subscribe({
              error: _ => window.alert('Could not log in after sign up'),
              complete: () => this.router.navigate(['/'])
            });
        }
      });
  }
}
