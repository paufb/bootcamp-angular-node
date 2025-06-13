import { Location } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, inject, input, output, signal, viewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../../core/auth/auth.service';
import { IPost } from '../../interfaces/post.interface';
import { PostService } from '../../services/post.service';
import { ProfilePictureComponent } from '../profile-picture/profile-picture.component';

class NoErrorErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return false;
  }
}

@Component({
  selector: 'app-post-prompt',
  imports: [FormsModule, MatButton, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule, ProfilePictureComponent, ReactiveFormsModule],
  templateUrl: './post-prompt.component.html',
  styleUrl: './post-prompt.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostPromptComponent {
  readonly cancellable = input(false, { transform: booleanAttribute });
  readonly createPost = output<IPost>();
  protected readonly authService = inject(AuthService);
  private readonly postService = inject(PostService);
  private readonly location = inject(Location);
  private readonly router = inject(Router);
  private readonly formDirective = viewChild.required(FormGroupDirective);
  protected readonly noErrorErrorStateMatcher = new NoErrorErrorStateMatcher();
  protected readonly isSubmitting = signal(false);
  protected readonly authenticatedUser = this.authService.authenticatedUser;
  protected readonly formGroup = new FormGroup({
    body: new FormControl('', { nonNullable: true, validators: [Validators.required] })
  });

  protected onSubmit() {
    if (!this.formGroup.valid) return;
    this.isSubmitting.set(true);
    const dto = this.formGroup.getRawValue();
    this.postService.createPost(dto)
      .subscribe({
        next: post => {
          this.isSubmitting.set(false);
          this.formGroup.reset();
          this.formDirective().resetForm();
          this.createPost.emit(post);
        },
        error: error => window.alert(`Could not create post: ${error.message}`)
      });
  }

  protected onCancel() {
    const { navigationId } = this.location.getState() as any;
    if (navigationId > 1)
      this.location.back();
    else
      this.router.navigate(['/']);
  }
}
