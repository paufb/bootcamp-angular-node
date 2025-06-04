import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { ProfilePictureComponent } from '../../../shared/components/profile-picture/profile-picture.component';
import { IEditUserDTO } from '../../../shared/interfaces/edit-user-dto.interface';
import { UserService } from '../../../shared/services/user.service';

interface ProfileSettingsForm {
  name: FormControl<IEditUserDTO['name']>;
  username: FormControl<IEditUserDTO['username']>;
}

@Component({
  selector: 'app-profile-settings',
  imports: [FormsModule, MatButton, MatFormFieldModule, MatIcon, MatInput, ReactiveFormsModule, ProfilePictureComponent],
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
  protected readonly formGroup = new FormGroup<ProfileSettingsForm>({
    name: new FormControl(this.authenticatedUser()!.name, { nonNullable: true }),
    username: new FormControl(this.authenticatedUser()!.username, { nonNullable: true })
  });

  protected navigateBack(toUsername?: string) {
    const { navigationId } = this.location.getState() as any;
    if (!toUsername && navigationId > 1) return this.location.back();
    this.router.navigate(['/user', toUsername ?? this.authenticatedUser()!.username]);
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
        error: error => window.alert(`Could not edit user: ${error.message}`)
      });
  }
}
