import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { ProfilePictureComponent } from '../../../shared/components/profile-picture/profile-picture.component';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-profile-settings',
  imports: [FormsModule, MatButton, MatFormFieldModule, MatIcon, MatIconButton, MatInput, ReactiveFormsModule, ProfilePictureComponent],
  templateUrl: './profile-settings.component.html',
  styleUrl: './profile-settings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileSettingsComponent {
  private readonly location = inject(Location);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly userService = inject(UserService);
  protected readonly authenticatedUser = this.authService.authenticatedUser;
  protected readonly isPasswordHidden = signal<boolean>(true);
  protected readonly formGroup = new FormGroup({
    name: new FormControl(this.authenticatedUser()!.name, { nonNullable: true, validators: [Validators.required] }),
    username: new FormControl(this.authenticatedUser()!.username, { nonNullable: true, validators: [Validators.required] }),
    password: new FormControl<string | null>(null),
    profilePicture: new FormControl<File | null>(null)
  });

  protected navigateBack(toUsername?: string) {
    const { navigationId } = this.location.getState() as any;
    if (!toUsername && navigationId > 1) return this.location.back();
    this.router.navigate(['/user', toUsername ?? this.authenticatedUser()!.username]);
  }

  protected selectProfilePictureFile(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files![0];
    this.formGroup.patchValue({ profilePicture: file });
  }

  protected onSubmit() {
    if (!this.formGroup.valid) return;
    const data = this.formGroup.getRawValue();
    this.userService.editUser(this.authenticatedUser()!._id, data)
      .subscribe({
        next: user => {
          this.authService.updateAuthenticatedUser(user);
          this.navigateBack(user.username);
        },
        error: error => {
          if (error.status === 400)
            this.formGroup.get('username')?.setErrors({ usernameTaken: true });
          else
            window.alert(`Could not edit user: ${error.message}`);
        }
      });
  }
}
