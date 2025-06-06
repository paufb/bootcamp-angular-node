import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { fadeIn, fadeOut, scaleFadeInFromTop } from '../../../shared/animations';
import { PostCardSkeletonComponent } from '../../../shared/components/post-card-skeleton/post-card-skeleton.component';
import { PostCardComponent } from '../../../shared/components/post-card/post-card.component';
import { PostReplyComponent } from '../../../shared/components/post-reply/post-reply.component';
import { ProfilePictureComponent } from '../../../shared/components/profile-picture/profile-picture.component';
import { ICreatePostReplyDTO } from '../../../shared/interfaces/create-post-reply-dto.interface';
import { IPost } from '../../../shared/interfaces/post.interface';
import { IPostReply } from '../../../shared/interfaces/post-reply.interface';
import { PostService } from '../../../shared/services/post.service';
import { PostReplyService } from '../../../shared/services/post-reply.service';

interface IPostReplyForm {
  body: FormControl<ICreatePostReplyDTO['body']>;
}

@Component({
  selector: 'app-post-page',
  imports: [FormsModule, MatButton, MatFormFieldModule, MatInput, PostCardComponent, PostCardSkeletonComponent, PostReplyComponent, ProfilePictureComponent, ReactiveFormsModule],
  templateUrl: './post-page.component.html',
  styleUrl: './post-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeIn, fadeOut, scaleFadeInFromTop]
})
export class PostPageComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly postReplyService = inject(PostReplyService);
  private readonly postService = inject(PostService);
  protected readonly post = signal<IPost | null>(null);
  protected readonly postReplies = signal<IPostReply[] | null>(null);
  protected readonly newlyCreatedPostReplies = signal<IPostReply[]>([]);
  protected readonly authenticatedUser = this.authService.authenticatedUser;
  protected readonly formGroup = new FormGroup<IPostReplyForm>({
    body: new FormControl('', { nonNullable: true, validators: [Validators.required] })
  });
  private postId!: string;
  private lastReplyCreatedAt?: string;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.postId = params['id'];
      this.fetchPostData();
      this.fetchMoreReplies();
    });
  }

  private fetchPostData() {
    this.postService.getPost(this.postId)
      .subscribe({
        next: post => this.post.set(post),
        error: error => window.alert(`Could not fetch post: ${error.message}`)
      });
  }

  protected fetchMoreReplies() {
    this.postReplyService.getPostReplies(this.postId, { pageSize: 10, createdBefore: this.lastReplyCreatedAt })
      .subscribe({
        next: postReplies => {
          this.postReplies.update(prev => [...(prev ?? []), ...postReplies]);
          if (postReplies.length > 0)
            this.lastReplyCreatedAt = postReplies[postReplies.length - 1].createdAt;
        },
        error: error => window.alert(`Could not fetch post replies: ${error.message}`)
      });
  }

  protected onSubmit(formGroupDirective: FormGroupDirective) {
    if (!this.formGroup.valid) return;
    const formData = this.formGroup.getRawValue();
    this.postReplyService.createPostReply(this.postId, formData)
      .subscribe({
        next: postReply => {
          this.newlyCreatedPostReplies.update(prev => [postReply, ...prev]);
          formGroupDirective.resetForm();
        },
        error: error => window.alert(`Could not create post reply: ${error.message}`)
      });
  }
}
