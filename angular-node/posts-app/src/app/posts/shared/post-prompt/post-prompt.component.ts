import { Location } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, inject, input, output, signal, viewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProfilePictureComponent } from '../../../shared/profile-picture/profile-picture.component';
import { CreatePostDTO } from '../create-post-dto.interface';
import { PostService } from '../post.service';
import { IPost } from '../post.interface';
import { AuthService } from '../../../auth/shared/auth.service';

@Component({
  selector: 'app-post-prompt',
  imports: [FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule, ProfilePictureComponent, ReactiveFormsModule],
  templateUrl: './post-prompt.component.html',
  styleUrl: './post-prompt.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostPromptComponent {
  cancellable = input(false, { transform: booleanAttribute });
  createPost = output<IPost>();
  protected readonly authService = inject(AuthService);
  private readonly postService = inject(PostService);
  private readonly location = inject(Location);
  private readonly router = inject(Router);
  private readonly formDirective = viewChild.required(FormGroupDirective);
  protected readonly isSubmitting = signal(false);
  protected readonly authenticatedUser = this.authService.authenticatedUser;
  protected readonly formGroup = new FormGroup({
    body: new FormControl('', Validators.required)
  });

  protected onSubmit() {
    if (!this.formGroup.valid) return;
    this.isSubmitting.set(true);
    const dto: CreatePostDTO = this.formGroup.value as CreatePostDTO;
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
      this.router.navigateByUrl('');
  }
}
