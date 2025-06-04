import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { PostPromptComponent } from '../../../shared/components/post-prompt/post-prompt.component';
import { IPost } from '../../../shared/interfaces/post.interface';
import { PostService } from '../../../shared/services/post.service';

@Component({
  selector: 'app-posts-new',
  imports: [FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, PostPromptComponent],
  templateUrl: './posts-new.component.html',
  styleUrl: './posts-new.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostsNewComponent {
  private readonly postService = inject(PostService);
  private readonly location = inject(Location);

  protected onCreatePost(newPost: IPost) {
    this.postService.createPost(newPost)
      .subscribe({
        error: error => window.alert(`Could not create post: ${error.message}`),
        complete: () => this.location.back()
      });
  }
}
